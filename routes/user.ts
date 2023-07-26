import express, { Request, Response } from 'express';
import  { User }  from '../models/user';
import axios from 'axios';


const userRoute = express();

interface SpotifyUserResponse {
    id: string;
    access_token: string;
    refresh_token: string;
}


userRoute.get('/getuser', async (req: Request, res: Response) => {
    const accessToken: string = req.cookies.userAuthToken; 
    const refreshToken: string = req.cookies.userAuthRefreshToken;
    try {
      const response = await axios.get<SpotifyUserResponse>('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const { id, access_token } = response.data;
  
      // Create or update the user in the database
      await User.upsert({
        spotify_id: id,
        access_token: access_token,
        refresh_token: refreshToken,
      });
      
      res.json({id, access_token});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch user information from Spotify API /spotifyuser' });
    }
  });

export default userRoute;