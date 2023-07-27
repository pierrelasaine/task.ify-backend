CREATE TABLE users (
    spotify_id VARCHAR(255) PRIMARY KEY NOT NULL,
    access_token VARCHAR(255) NOT NULL,
    refresh_token VARCHAR(255) NOT NULL
);

CREATE TABLE playlists (
    playlist_id VARCHAR(255) PRIMARY KEY NOT NULL,
    playlist_name VARCHAR(255) NOT NULL,
    spotify_id VARCHAR(255) REFERENCES users(spotify_id)
);

CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY NOT NULL,
    task_name VARCHAR(255) NOT NULL,
    timer INT NOT NULL,
    vibe VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    spotify_id VARCHAR(255) REFERENCES users(spotify_id),
    playlist_id VARCHAR(255) REFERENCES playlists(playlist_id)
);

CREATE TABLE tracks (
    track_id VARCHAR(255) PRIMARY KEY NOT NULL,
    track_name VARCHAR(255) NOT NULL,
    track_artist VARCHAR(255) NOT NULL,
    track_uri VARCHAR(255) NOT NULL,
    playlist_id VARCHAR(255) REFERENCES playlists(playlist_id)
);