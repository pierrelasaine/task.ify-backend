import { DataTypes } from 'sequelize';
import { sequelize } from '../database';
import { Track } from './track';

const Playlist = sequelize.define('playlists', {
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
}, {
  timestamps: false, 
});

Playlist.hasMany(Track, { foreignKey: 'playlist_id' });
Track.belongsTo(Playlist, { foreignKey: 'playlist_id' });

export { Playlist };