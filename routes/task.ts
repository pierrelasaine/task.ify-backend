import express, { Request, Response } from 'express';
import  { User }  from '../models/user';
import { Task } from '../models/task';  
import axios from 'axios';
import userRoute from './user';
import gptRoute from './chatgpt';

const taskRoute = express();


taskRoute.get('/', async (req: Request, res: Response) => {
    try {
        const spotifyUser = await axios.get(userRoute.get('/spotifyuser'));
        const { User } = spotifyUser.data;
        const tasks = await User.Task.findAll();
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch tasks from database /tasks' });
    }
});

taskRoute.get('/tasks/:id', async (req: Request, res: Response) => {
    try {
        const spotifyUser = await axios.get(userRoute.get('/spotifyuser'));
        const { User } = spotifyUser.data;
        const { id } = req.params;
        const task = await User.Task.findByPk(id);
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch task from database /tasks/:id' });
    }
});

taskRoute.delete('/tasks/:id', async (req: Request, res: Response) => {
    try {
        const spotifyUser = await axios.get(userRoute.get('/spotifyuser'));
        const { User } = spotifyUser.data;
        const { id } = req.params;
        const task = await User.Task.findByPk(id);
        if (task) {
            await task.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete task in database /tasks/:id' });
    }
});

taskRoute.get('/tasks/:id/playlistcover', async (req: Request, res: Response) => {   
    try {
        const spotifyUser = await axios.get(userRoute.get('/spotifyuser'));
        const { User } = spotifyUser.data;
        const userSpotifyId = spotifyUser.data.id;
        const { id } = req.params;
        const task = await userSpotifyId.Task.findByPk(id);

        if (task) {
            const playlistCover = await axios.get('https://api.spotify.com/v1/playlists/${task.playlist_id}/images');
            res.json(playlistCover);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch playlist cover from Spotify API /tasks/:id/playlistcover' });
    }
});


export default taskRoute;