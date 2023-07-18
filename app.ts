import express from 'express';
import config from './utils/config';

const app = express();

app.get('/', async (req, res) => {
    res.json({ping: 'pong'})
})

module.exports = app;

