import express, { Request, Response } from "express";
import axios from "axios";
import { Playlist } from "../models/playlist";
import { User } from "../models/user";

const playlistRoute = express();

interface Tracks {
  title: string;
  artist: string;
  uri: string;
}

playlistRoute.post("/callback", async (req: Request, res: Response) => {
  try {
    const { playlistName, tracks, accessToken } = req.body as {
      playlistName: string;
      tracks: Tracks[];
      accessToken: string;
    };

    const spotifyUserInstance = await User.findOne({
      where: { access_token: accessToken },
    });
    
    if (!spotifyUserInstance) {
      return res
        .status(404)
        .json({ error: "User not found with the given access token" });
    }

    const spotifyUser = spotifyUserInstance.get();

    const spotifyId: string = spotifyUser.spotify_id;

    const spotifyApiResponse = await axios.post(
      `https://api.spotify.com/v1/users/${spotifyId}/playlists`,
      {
        name: playlistName,
        public: true,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const playlistId = spotifyApiResponse.data.id;

    await Playlist.upsert({
      playlist_name: playlistName,
      playlist_id: playlistId,
      spotify_id: spotifyId,
    });

    const addTracksToPlaylistResponse = await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        uris: tracks.map((track) => track.uri),
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ playlistId, spotifyId });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to fetch playlist from Spotify API /create" });
  }
});

export default playlistRoute;
