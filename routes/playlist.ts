import express, {Request, Response} from 'express';
import axios from 'axios';
import config from '../utils/config';
import { Playlist } from '../models/playlist';
import { Song } from '../models/song';


const playlistRoute = express();

playlistRoute.post('/create', async (req: Request, res: Response) => {
    try {
        const { playlistName, songs } = req.body;
        
        const spotifyApiResponse = await axios.post('https://api.spotify.com/v1/users/1216067691/playlists', {

        });
    
    const { playlist_name, playlistId, spotifyId, song} = spotifyApiResponse.data;   

    await Playlist.upsert({
        playlist_name: playlistName,
        playlist_id: playlistId,
        spotify_id: spotifyId,
    });

    res.status(200).json({ message: 'Playlist information stored in the database' });

    await Song.upsert({
        song_name: songName,
        artist: artist,
        album: album,
        song_id: songId,
        playlist_id: playlistId
    });

    res.status(200).json({ message: 'Song information stored in the database' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch playlist from Spotify API /create' });
    }
});
