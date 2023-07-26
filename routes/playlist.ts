import express, { Request, Response } from 'express';
import axios from 'axios';
import { Playlist } from '../models/playlist';
import userRoute from './user';
import { Track } from '../models/track';

const playlistRoute = express();

interface Tracks {
  title: string;
  artist: string;
  uri: string; // Assuming you have a 'uri' property for each track
}

playlistRoute.post('/callback', async (req: Request, res: Response) => {
  try {
    
    console.log("HEREEEEEEE")
    const { playlistName, tracks } = req.body as { playlistName: string; tracks: Tracks[] };

    const spotifyUser = await axios.get(`${userRoute}/spotifyuser`);
  
    const userAcessToken = spotifyUser.data.access_token;
    const userSpotifyId = spotifyUser.data.id;

    // Make the request to Spotify API to create a new playlist
    const spotifyApiResponse = await axios.post(
      `https://api.spotify.com/v1/users/${userSpotifyId}/playlists`,
      {
        name: playlistName,
        public: true,
      },
      {
        headers: {
          Authorization: `Bearer ${userAcessToken}`,
        },
      }
    );
    
    console.log("spotify api response console log:", spotifyApiResponse.data)
    const { name: playlist_name, id: playlistId, owner: { id: spotify_id } } = spotifyApiResponse.data;


    // Create or update the playlist in the database
    await Playlist.upsert({
      playlist_name: playlist_name,
      playlist_id: playlistId,
      spotify_id: spotify_id,
    });

    // Insert songs into the database
    for (const song of tracks) {
      await Track.upsert({
        track_name: song.title,
        artist: song.artist,
        uri: song.uri,
        playlist_id: playlistId,
      });
    }

    console.log("track mapping in playlist route:", tracks.map((track) => track.uri).join(','))
    // Add tracks to the newly created playlist on Spotify
    const addTracksToPlaylistResponse = await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        uris: tracks.map((track) => track.uri).join(','),
      },
      {
        headers: {
          Authorization: `Bearer ${userAcessToken}`,
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

