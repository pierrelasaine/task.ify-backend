import express, { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import { Task } from "../models/task";
import config from "../utils/config";

const backend_base_url = config.backend_base_url;

const gptRoute = express();

gptRoute.post("/generateplaylist", async (req: Request, res: Response) => {
  try {
    const { vibe, timer, taskName, category } = req.body.task;
    const accessToken = req.body.token;

    const gptApiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: `You are a helpful assistant.` },
          {
            role: "user",
            content: `Generate a playlist (only put songs from 2021 and earlier and no repeat songs in one playlist) with mood: ${vibe}, exact minutes of playlist duration: ${timer} times 2, and dynamically give this the playlist name using the ${taskName} and ${vibe}. In the response return a json object of each song with the title, artist, and a valid spotify uri (if there is no uri, generate a different song).:
              {
                  "playlistName": "My Playlist",
                  "tracks": [
                      {
                          "title": "Song Title",
                          "artist": "Artist Name",
                          "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh"
                      },
                  ]
              }`,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.gpt_secretkey}`,
        },
      }
    );
    const gptMessageContent = JSON.parse(
      gptApiResponse.data.choices[0].message.content
    );
    const playlistName = gptMessageContent.playlistName;
    const tracks = gptMessageContent.tracks;
    
    const playlistResponse: {
      data: { playlistId: string; spotifyId: string };
    } = await axios.post(`${backend_base_url}/playlist/callback`, {
      playlistName,
      tracks,
      accessToken,
    });

    const playlistId = playlistResponse.data.playlistId;
    const spotifyId = playlistResponse.data.spotifyId;

    await Promise.all(
      await Task.upsert({
        task_name: taskName,
        timer: timer,
        vibe: vibe,
        category: category,
        playlist_id: playlistId,
        spotify_id: spotifyId,
      })
    );

    res.json({ playlistId, spotifyId });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch playlist from GPT API /gptgenerateplaylist",
    });
  }
});

export default gptRoute;
