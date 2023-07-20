CREATE TABLE user {
    spotify_id VARCHAR(255) NOT NULL,
    access_token VARCHAR(255) NOT NULL,
    refresh_token VARCHAR(255) NOT NULL,
    PRIMARY KEY (spotify_id)
};

CREATE TABLE task {
    task_id INT NOT NULL AUTO_INCREMENT,
    task_name VARCHAR(255) NOT NULL,
    timer INT NOT NULL,
    vibe VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    FOREIGN KEY (playlist_id) REFERENCES playlist(playlist_id)
};

CREATE TABLE playlist {
    playlist_id INT NOT NULL AUTO_INCREMENT,
    playlist_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (spotify_id) REFERENCES user(spotify_id)
};

CREATE TABLE song {
    song_id INT NOT NULL AUTO_INCREMENT,
    song_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (playlist_id) REFERENCES playlist(playlist_id)
};