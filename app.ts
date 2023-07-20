import express, { Request, Response } from 'express'
import userRoute from './routes/user'
import oAuthRoute from './routes/oauth'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

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
app.use('/', userRoute)

app.get('/', async (req: Request, res: Response) => {
    res.json({ ping: 'pong' })
})

export default app
