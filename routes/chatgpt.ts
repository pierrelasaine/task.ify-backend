import express, {Request, Response} from 'express';
import axios from 'axios';
import { Task } from '../models/task';
import config from '../utils/config';

const gptRoute = express();

gptRoute.post('/gptgenerateplaylist', async (req: Request, res: Response) => {
    try {
        const { vibe, timer, taskName } = req.body;

        const gptApiResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: `You are a helpful assistant.` },
              { role: 'user', content: `Generate a playlist with vibe: ${vibe}, time: ${timer}, and a playlist name: ${taskName}.` }
            ]
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${config.gpt_secretkey}`
            }
          });

        //Extract the playlist data from the GPT API response
        const playlistName = gptApiResponse.data.choices[0].message.content;
        const songs = gptApiResponse.data.choices[0].message.songs;

        await axios.post('/playlist/create', { playlistName, songs });

        await Task.upsert({
            task_id: taskId,
            task_name: taskName,
            timer: timer,
            vibe: vibe,
            category: category,
            playlist_id: playlistId,
        });


        res.json({ playlistName, songs });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch playlist from GPT API /gptgenerateplaylist' });
    }
});


export default gptRoute;