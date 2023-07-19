import express, { Request, Response } from 'express';

const app = express();



app.use('/spotifyuser', require('./routes/user'));

app.get('/', async (req: Request, res: Response) => {
    res.json({ ping: 'pong' });
});

export default app;


