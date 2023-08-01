import express, { Request, Response } from 'express';
import request from 'supertest';
import { User } from '../models/user';
import { Task } from '../models/task';
import taskRoute from './task';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Task Route Handler Tests', () => {
  let app: express.Application;

  beforeAll(() => {
    
    app = express();
    app.use(express.json());
    app.use('/', taskRoute);

    
    jest.spyOn(User, 'findOne').mockResolvedValue(User.build({}));
    jest.spyOn(Task, 'findAll').mockResolvedValue([Task.build({})]);
    jest.spyOn(Task, 'findOne').mockResolvedValue(Task.build({}));
    jest.spyOn(Task.prototype, 'destroy').mockResolvedValue(true);

    jest.mock('../models/user', () => ({
      User,
    }));

    jest.mock('../models/task', () => ({
      Task,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch tasks from the database', async () => {
    const response = await request(app).post('/').send({ token: 'mock_access_token' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: [expect.any(Object)] });
  });

  it('should return 404 when user is not found with the given access token', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue(null);
  
    const response = await request(app).post('/').send({ token: 'invalid_token' });
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "User not found with the given access token" });
  });

  it('should fetch a task by id from the database', async () => {
    const response = await request(app).get('/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: expect.any(Object) });
  });

  it('should delete a task by id from the database', async () => {
    const response = await request(app).delete('/delete/1');
    expect(response.status).toBe(204);
  });

  it('should fetch the playlist cover by id from the Spotify API', async () => {
    const playlistId = 'mocked_playlist_id';

    
    jest.spyOn(Task, 'findOne').mockResolvedValue(Task.build({}));
    const playlistCoverResponse = {
      data: [
        {
          url: 'https://example.com/cover.jpg',
          height: 300,
          width: 300,
        },
      ],
    };
    mockedAxios.get.mockResolvedValue(playlistCoverResponse);

    const response = await request(app).get(`/${playlistId}/playlistcover`).set('Authorization', 'mock_access_token');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: {
        url: 'https://example.com/cover.jpg',
        height: 300,
        width: 300,
      },
    });


    expect(Task.findOne).toHaveBeenCalledWith({ where: { playlist_id: playlistId } });

    expect(mockedAxios.get).toHaveBeenCalledWith(`https://api.spotify.com/v1/playlists/${playlistId}/images`, {
      headers: {
        Authorization: 'mock_access_token',
      },
    });
  });

  it('should return 500 when there is an error fetching playlist cover from Spotify API', async () => {
    const playlistId = 'mock_playlist_id';

    jest.spyOn(Task, 'findOne').mockResolvedValue(Task.build({}));

    mockedAxios.get.mockRejectedValue('Spotify API Error');

    const response = await request(app).get(`/${playlistId}/playlistcover`).set('Authorization', 'mock_access_token');
    
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ 
        error: "Failed to fetch playlist cover from Spotify API /tasks/:id/playlistcover"
    });

    expect(mockedAxios.get).toHaveBeenCalledWith(`https://api.spotify.com/v1/playlists/${playlistId}/images`, {
        headers: {
            Authorization: 'mock_access_token',
        },
    });
});

it('should return 404 when no cover art is available for the given playlist on Spotify', async () => {
  const playlistId = 'mock_playlist_id_no_cover';

  jest.spyOn(Task, 'findOne').mockResolvedValue(Task.build({}));

  mockedAxios.get.mockResolvedValue({ data: [] });

  const response = await request(app).get(`/${playlistId}/playlistcover`).set('Authorization', 'mock_access_token');
  
  expect(response.status).toBe(404);
  expect(response.body).toEqual({ 
      error: "Playlist cover not found"
  });

  expect(Task.findOne).toHaveBeenCalledWith({ where: { playlist_id: playlistId } });

  expect(mockedAxios.get).toHaveBeenCalledWith(`https://api.spotify.com/v1/playlists/${playlistId}/images`, {
      headers: {
          Authorization: 'mock_access_token',
      },
  });
});

});
