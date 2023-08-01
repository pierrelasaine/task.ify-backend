import express, { Request, Response } from 'express';
import request from 'supertest';
import axios from 'axios';
import { Playlist } from '../models/playlist';
import { User } from '../models/user';
import playlistRoute from './playlist';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Playlist Route Handler Tests', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/', playlistRoute);

    // Spy on Sequelize models and mock their methods
    jest.spyOn(User, 'findOne').mockResolvedValue(User.build({ spotify_id: 'mock_spotify_id' }));
    jest.spyOn(Playlist, 'upsert').mockResolvedValue([Playlist.build(), true]);

    // Ensure Sequelize models use the correct mock implementations
    jest.mock('../models/user', () => ({
      User,
    }));

    jest.mock('../models/playlist', () => ({
      Playlist,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a playlist and return a valid response', async () => {
    const playlistName = 'My Playlist';
    const tracks = [
      {
        title: 'Song Title 1',
        artist: 'Artist 1',
        uri: 'spotify:track:track_1',
      },
      {
        title: 'Song Title 2',
        artist: 'Artist 2',
        uri: 'spotify:track:track_2',
      },
    ];
    const accessToken = 'mock_access_token';

    const spotifyApiResponse = {
      data: {
        id: 'mock_playlist_id',
      },
    };
    mockedAxios.post.mockResolvedValue(spotifyApiResponse);

    const requestBody = {
      playlistName,
      tracks,
      accessToken,
    };

    const response = await request(app)
      .post('/callback')
      .send(requestBody);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      playlistId: 'mock_playlist_id',
      spotifyId: 'mock_spotify_id',
    });

    expect(Playlist.upsert).toHaveBeenCalledWith(expect.objectContaining({
      playlist_name: playlistName,
      playlist_id: 'mock_playlist_id',
      spotify_id: 'mock_spotify_id',
    }));
  });

  it('should handle errors when creating a playlist', async () => {
    mockedAxios.post.mockRejectedValue('Some error occurred');

    const requestBody = {
      playlistName: 'My Playlist',
      tracks: [],
      accessToken: 'mock_access_token',
    };

    const response = await request(app)
      .post('/callback')
      .send(requestBody);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: 'Failed to fetch playlist from Spotify API /create',
    });
  });
});
