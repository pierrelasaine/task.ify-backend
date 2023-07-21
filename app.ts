import express, { Request, Response } from 'express'
import userRoute from './routes/user'
import oAuthRoute from './routes/oauth'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import gptRoute from './routes/chatgpt'
import playlistRoute from './routes/playlist'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)

app.use('/oauth', oAuthRoute)
app.use('/spotifyuser', userRoute)
app.use('/gpt', gptRoute)
app.use('/playlist', playlistRoute)

app.get('/', async (req: Request, res: Response) => {
    res.json({ ping: 'pong' })
})

export default app
