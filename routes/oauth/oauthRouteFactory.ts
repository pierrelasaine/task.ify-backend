import express, { Request, Response } from 'express'
import querystring from 'querystring'
import axios from 'axios'
import { User } from '../../models/user'
import SpotifyTokenResponse from '../../interfaces/SpotifyTokenResponse'
import session from 'express-session'
import RedisStoreWrapper from './redisStoreWrapper'
import oAuthVariables from '../../interfaces/oAuthVariables'

declare module 'express-session' {
    interface SessionData {
        accessToken?: string
        refreshToken?: string
        state?: string
    }
}

/**
 * Factory function to create OAuth routes.
 * @param utils - Utility functions
 * @param axiosInstance - Instance of axios library
 * @param userModel - User model for database operations
 * @param redisStoreWrapper - Wrapper around Redis store
 * @param variables - OAuth configuration variables
 * @returns A configured express router for OAuth operations
 */
const createOAuthRoute = (
    utils: any,
    axiosInstance: typeof axios,
    userModel: typeof User,
    redisStoreWrapper: RedisStoreWrapper,
    variables: oAuthVariables
) => {
    const { client_id, client_secret, frontend_base_url, backend_base_url } =
        variables
    const redirect_uri = `${backend_base_url}/oauth/callback`

    const oAuthRoute = express()

    const sessionMiddleware = session({
        store: redisStoreWrapper.createStore(),
        secret: client_secret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            sameSite: 'none',
            secure: true
        }
    })

    oAuthRoute.use(sessionMiddleware)

    oAuthRoute.get('/login', (req: Request, res: Response) => {
        try {
            const state = utils.generateRandomString(16)
            const scope =
                'user-read-private user-read-email playlist-modify-public playlist-modify-private'

            req.session.state = state

            res.redirect(
                'https://accounts.spotify.com/authorize?' +
                    querystring.stringify({
                        response_type: 'code',
                        client_id: client_id,
                        redirect_uri: redirect_uri,
                        state: state,
                        scope: scope
                    })
            )
        } catch (error: any) {
            console.error('Error during login:', error.message)
            res.status(500).json({ error: 'Failed to initiate login process' })
        }
    })

    oAuthRoute.get('/callback', async (req: Request, res: Response) => {
        try {
            const code = req.query.code as string | null
            const state = req.query.state as string | null

            if (!code || !state) {
                throw new Error('Code or state parameter is missing.')
            }

            // if (state !== req.session.state) {
            //     throw new Error('State mismatch.')
            // }

            const authOptions = {
                method: 'post',
                url: 'https://accounts.spotify.com/api/token',
                headers: {
                    'Authorization':
                        'Basic ' +
                        Buffer.from(`${client_id}:${client_secret}`).toString(
                            'base64'
                        ),
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: querystring.stringify({
                    code: code,
                    redirect_uri: redirect_uri,
                    grant_type: 'authorization_code'
                })
            }

            const response = await axios.post(
                authOptions.url,
                authOptions.data,
                { headers: authOptions.headers }
            )

            const data: SpotifyTokenResponse = response.data

            const { access_token: accessToken, refresh_token: refreshToken } =
                data
            req.session.accessToken = accessToken

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                maxAge: 3600000
            })

            const getSpotifyMe = await axiosInstance.get(
                'https://api.spotify.com/v1/me',
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )

            const spotifyId = getSpotifyMe.data.id

            await userModel.upsert({
                spotify_id: spotifyId,
                access_token: accessToken,
                refresh_token: refreshToken
            })

            res.redirect(`${frontend_base_url}/dashboard`)
        } catch (error: any) {
            if (error.response) {
                console.error('Error from Spotify API:', error.response.data)
                return res
                    .status(error.response.status)
                    .json(error.response.data)
            }
            console.error('Error during callback:', error.message)
            res.status(500).json({
                error: 'Failed to handle the OAuth callback'
            })
        }
    })

    oAuthRoute.get('/logout', (req: Request, res: Response) => {
        try {
            console.log('before clearing', req.cookies, '//', res.cookie)
            res.clearCookie('accessToken')
            console.log('after clearing', req.cookies, '//', res.cookie)
            res.status(204).send()
        } catch (error: any) {
            console.error('Error during logout:', error.message)
            res.status(500).json({ error: 'Failed to logout' })
        }
    })

    oAuthRoute.get('/session-status', (req: Request, res: Response) => {
        try {
            if (req.cookies && req.cookies.accessToken) {
                console.log('Access token found in cookie')
                res.json({
                    data: {
                        isAuthenticated: true,
                        token: req.cookies.accessToken
                    }
                })
            } else {
                console.log('Token found in cookie')
                res.json({ data: { isAuthenticated: false } })
            }
        } catch (error: any) {
            console.error('Error checking session status:', error.message)
            res.status(500).json({ error: 'Failed to check session status' })
        }
    })

    return oAuthRoute
}

export default createOAuthRoute
