import express from 'express';
import request from 'supertest';
import axios from 'axios';
import { Task } from '../models/task';
import gptRoute from './chatgpt';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GPT Route Handler Tests', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/', gptRoute);

    jest.spyOn(Task, 'upsert').mockResolvedValue([Task.build(), true]);
    jest.mock('../models/task', () => ({
      Task,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should generate a playlist and return a valid response', async () => {
    const gptApiResponse = {
      data: {
        choices: [
          {
            message: {
              content: JSON.stringify({
                playlistName: 'My Playlist',
                tracks: [
                  {
                    title: 'Song Title',
                    artist: 'Artist Name',
                    uri: 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh',
                  },
                ],
              }),
            },
          },
        ],
      },
    };
  
    const playlistResponse = {
      data: {
        playlistId: 'mock_playlist_id',
        spotifyId: 'mock_spotify_id',
      },
    };

    mockedAxios.post.mockImplementationOnce(() => Promise.resolve(gptApiResponse))
                 .mockImplementationOnce(() => Promise.resolve(playlistResponse));

    const requestBody = {
      task: {
        vibe: 'Some Vibe',
        timer: 10,
        taskName: 'Some Task Name',
        category: 'Some Category',
      },
      token: 'mock_access_token',
    };

    const response = await request(app).post('/generateplaylist').send(requestBody);
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      playlistId: 'mock_playlist_id',
      spotifyId: 'mock_spotify_id',
    });

    expect(Task.upsert).toHaveBeenCalledWith(expect.objectContaining({
      task_name: requestBody.task.taskName,
      timer: requestBody.task.timer,
      vibe: requestBody.task.vibe,
      category: requestBody.task.category,
      playlist_id: 'mock_playlist_id',
      spotify_id: 'mock_spotify_id',
    }));
  });

  it('should handle errors when generating a playlist', async () => {
    mockedAxios.post.mockRejectedValue('Some error occurred');

    const requestBody = {
      task: {
        vibe: 'Some Vibe',
        timer: 10,
        taskName: 'Some Task Name',
        category: 'Some Category',
      },
      token: 'mock_access_token',
    };

    const response = await request(app).post('/generateplaylist').send(requestBody);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: 'Failed to fetch playlist from GPT API /gptgenerateplaylist',
    });
  });
});
