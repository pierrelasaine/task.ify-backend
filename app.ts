import express, { Request, Response } from 'express';
import userRoute from './routes/user';
import oAuthRoute from './routes/oauth';

const app = express();


app.use('/oauth', oAuthRoute)
app.use('/', userRoute);

app.get('/', async (req: Request, res: Response) => {
    res.json({ ping: 'pong' });
});

export default app;


