import createOAuthRoute from './oauthRouteFactory'
import express from 'express'
import request from 'supertest'
import axios from 'axios'
import RedisStoreWrapper from './redisStoreWrapper'
import { Model } from 'sequelize'

class MockModel extends Model {
    static upsert = jest.fn()
}

jest.mock('axios', () => ({
    post: jest.fn(),
    get: jest.fn()
}))

const userModelMock = MockModel

const utilsMock = {
    generateRandomString: jest.fn(() => 'random_string')
}

// Mock RedisStoreWrapper
jest.mock('./redisStoreWrapper', () => {
    return jest.fn().mockImplementation(() => {
        return {
            createStore: jest.fn().mockReturnValue({})
        }
    })
})

interface MockSession {
    accessToken?: string
    state?: string
}

let mockSession: MockSession & {
    destroy?: (callback: (err: any) => void) => void
} = {
    destroy: callback => {
        mockSession = {} // Clear the session
        callback(null) // Invoke the callback with no error
    }
}

jest.mock('express-session', () => {
    return (config: any) => {
        return (req: any, res: any, next: any) => {
            req.session = mockSession
            next()
        }
    }
})

// Mock OAuthVariables
const oAuthVariablesMock = {
    client_id: 'valid_client_id',
    client_secret: 'valid_client_secret',
    frontend_base_url: 'valid_frontend_base_url',
    backend_base_url: 'valid_backend_base_url'
}

describe('OAuth routes', () => {
    let app: express.Express

    beforeEach(() => {
        app = express()
        app.use(
            createOAuthRoute(
                utilsMock,
                axios,
                userModelMock,
                new RedisStoreWrapper({}),
                oAuthVariablesMock
            )
        )
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('GET /login', () => {
        it('should initiate the login process', async () => {
            const response = await request(app).get('/login')

            expect(response.status).toBe(302)
            expect(response.header.location).toContain(
                'https://accounts.spotify.com/authorize?'
            )
        })

        it('should handle errors during the login process', async () => {
            utilsMock.generateRandomString.mockImplementation(() => {
                throw new Error('Random string error')
            })

            const response = await request(app).get('/login')

            expect(response.status).toBe(500)
            expect(response.body.error).toBe('Failed to initiate login process')
        })
    })

    describe('GET /callback', () => {
        it('should handle callback with valid code and state', async () => {
            mockSession.state = 'random_string'
            ;(axios.post as jest.Mock).mockResolvedValue({
                data: {
                    access_token: 'valid_access_token',
                    refresh_token: 'valid_refresh_token'
                }
            })
            ;(axios.get as jest.Mock).mockResolvedValue({
                data: {
                    id: 'spotify_user_id'
                }
            })
            const response = await request(app).get('/callback').query({
                code: 'valid_code',
                state: 'random_string'
            })

            expect(response.status).toBe(302)
        })

        it('should throw an error with missing code or state in callback', async () => {
            const response = await request(app).get('/callback').query({
                state: 'random_string'
            })
            expect(response.status).toBe(500)
        })

        it('should throw an error with missing code or state in callback', async () => {
            const response = await request(app).get('/callback').query({
                code: 'random_string'
            })
            expect(response.status).toBe(500)
        })

        // it('should handle state mismatch errors during callback', async () => {
        //     const response = await request(app).get('/callback').query({
        //         code: 'valid_code',
        //         state: 'invalid_state' // A state that's not saved in the session
        //     })
        //     expect(response.status).toBe(500)
        // })

        it('should handle errors from the Spotify API during the token request', async () => {
            ;(axios.post as jest.Mock).mockRejectedValue({
                response: {
                    status: 400,
                    data: 'Bad Request'
                }
            })

            const response = await request(app).get('/callback').query({
                code: 'valid_code',
                state: 'random_string'
            })
            expect(response.status).toBe(400)
        })

        it('should handle errors from the Spotify API during the profile request', async () => {
            ;(axios.post as jest.Mock).mockResolvedValue({
                data: {
                    access_token: 'valid_access_token',
                    refresh_token: 'valid_refresh_token'
                }
            })
            ;(axios.get as jest.Mock).mockRejectedValue({
                response: {
                    status: 400,
                    data: 'Bad Request'
                }
            })

            const response = await request(app).get('/callback').query({
                code: 'valid_code',
                state: 'random_string'
            })
            expect(response.status).toBe(400)
        })
    })

    describe('GET /logout', () => {
        it('should handle logout', async () => {
            const response = await request(app).get('/logout')
            expect(response.status).toBe(204)
        })

        // it('should handle errors during session destruction', async () => {
        //     mockSession.destroy = callback => {
        //         callback(new Error('Session destruction error'))
        //     }

        //     const response = await request(app).get('/logout')

        //     expect(response.status).toBe(500)
        //     expect(response.body.error).toBe('Failed to logout')
        // })
    })

    describe('GET /session-status', () => {
        // it('should return isAuthenticated=true if cookie contains accessToken', async () => {
        //     const mockToken = 'valid_access_token'

        //     const response = await request(app)
        //         .get('/session-status')
        //         .set('Cookie', [`accessToken=${mockToken}`])

        //     expect(response.body.data.isAuthenticated).toBe(true)
        // })
        it('should return isAuthenticated=false if session does not contain accessToken', async () => {
            mockSession.accessToken = undefined

            const response = await request(app).get('/session-status')
            expect(response.body.data.isAuthenticated).toBe(false)
        })

        // it('should handle errors during session status check', async () => {
        //     // Modify the session object to throw an error when trying to access accessToken
        //     Object.defineProperty(mockSession, 'accessToken', {
        //         get: () => {
        //             throw new Error('Session access error')
        //         }
        //     })

        //     const response = await request(app).get('/session-status')

        //     expect(response.status).toBe(500)
        //     expect(response.body.error).toBe('Failed to check session status')
        // })
        /**
         * @todo revisit these tests
         */
    })
})
