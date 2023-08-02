import express, { Request, Response } from 'express'
import oAuthRoute from './routes/oauth'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import gptRoute from './routes/chatgpt'
import playlistRoute from './routes/playlist'
import taskRoute from './routes/task'
import config from './utils/config'

const frontend_base_url = config.frontend_base_url

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(
    cors({
        origin: `${frontend_base_url}`,
        credentials: true
    })
)

app.use('/oauth', oAuthRoute)
app.use('/gpt', gptRoute)
app.use('/tasks', taskRoute)
app.use('/playlist', playlistRoute)

app.get('/', async (req: Request, res: Response) => {
    res.json({ ping: 'pong' })
})

export default app
