import express, { Request, Response } from 'express';
import axios from 'axios';
import { Playlist } from '../models/playlist';
import { Track } from '../models/track';
import userRoute from './user';

const playlistRoute = express();

interface Track {
  title: string;
  artist: string;
  uri: string;
}

playlistRoute.post('/createplaylistspotify', async (req: Request, res: Response) => {
  try {

    const { playlistName, tracks } = req.body as { playlistName: string; tracks: Track[] };

    const spotifyUser = await axios.get(userRoute.get('/spotifyuser'));
    const { User } = spotifyUser.data;

    // Make the request to Spotify API to create a new playlist
    const spotifyApiResponse = await axios.post(
      `https://api.spotify.com/v1/users/${User.spotify_id}/playlists`,
      {
        name: playlistName,
        public: true,
      },
      {
        headers: {
          Authorization: `Bearer ${User.access_token}`,
        },
      }
    );

    const { name: playlist_name, id: playlistId, owner: { id: spotify_id } } = spotifyApiResponse.data;

    // Create or update the playlist in the database
    await Playlist.upsert({
      playlist_name: playlist_name,
      playlist_id: playlistId,
      spotify_id: spotify_id,
    });

    const songs = tracks.map(track => ({
      track_name: track.title,
      artist: track.artist,
      uri: track.uri,
      playlist_id: playlistId,
    }));

    // Insert songs into the database
    await Track.bulkCreate(songs);

    const uris = tracks.map(track => track.uri);
    const addTracksToPlaylistResponse = await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        uris: uris,
      },
      {
        headers: {
          Authorization: `Bearer ${User.access_token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json({ message: 'Playlist and Song information stored in the database' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch playlist from Spotify API /create' });
  }
});

export default playlistRoute;
