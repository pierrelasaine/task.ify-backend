import express, { Router } from 'express';
import { Request, Response } from 'express';
import  { User }  from '../models/user';
import axios from 'axios';


const router: Router = express.Router();

interface SpotifyUserResponse {
    id: string;
    access_token: string;
    refresh_token: string;
}

//get user by spotify_id from User sequilize object in models/user.ts  
router.get('/spotifyuser', async (req: Request, res: Response) => {
    const accessToken = 'YOUR_SPOTIFY_ACCESS_TOKEN'; // Replace with the actual access token pulled from function in oauth
    const refreshToken = 'YOUR_SPOTIFY_REFRESH_TOKEN'; // Replace with the actual refresh token pulled from function in oauth
  
    try {
      const response = await axios.get<SpotifyUserResponse>('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const { id, access_token, refresh_token } = response.data;
  
      // Create or update the user in the database
      await User.upsert({
        spotify_id: id,
        access_token,
        refresh_token,
      });
  
      res.status(200).json({ message: 'User information stored in the database' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch user information from Spotify API' });
    }
  });

export default router;