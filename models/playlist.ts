import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

const Playlist = sequelize.define('Playlist', {
  playlist_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true,
  },
  playlist_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  spotify_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

module.exports = Playlist;