import express, {Request, Response} from 'express';
import axios from 'axios';
import { Task } from '../models/task';
import config from '../utils/config';

const gptRoute = express();

gptRoute.post('/gptgenerateplaylist', async (req: Request, res: Response) => {
    try {
        const { vibe, timer, taskName, category } = req.body;

        const gptApiResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: `You are a helpful assistant.` },
              { role: 'user', content: `Generate a playlist with vibe: ${vibe}, exact minutes of duration: ${timer}, and give this the playlist name using the ${taskName} and ${vibe}. In the response include
              nothing in the content with the exception of each song with the title, artist, and uri and give the response in the form a json object like the following example:
              {
                "playlistName": "My Playlist",
                "tracks": [
                  {
                    "title": "Song Title",
                    "artist": "Artist Name",
                    "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh"
                  },
              }
              ` },  
            ]
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${config.gpt_secretkey}`
            }
          });

        //Extract the playlist data from the GPT API response
        const playlistName = gptApiResponse.data.playlistName;
        const tracks = gptApiResponse.data.tracks;

        const playlistResponse = await axios.post('/playlist/createplaylistspotify', { playlistName, tracks });

        const { playlistId } = playlistResponse.data;

        await Task.upsert({
            task_name: taskName,
            timer: timer,
            vibe: vibe,
            category: category,
            playlist_id: playlistId,
        });

        res.json({ playlistName, tracks });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch playlist from GPT API /gptgenerateplaylist' });
    }
});


export default gptRoute;