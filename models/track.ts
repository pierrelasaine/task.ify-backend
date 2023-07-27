import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

const Track = sequelize.define('tracks', {
  track_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true,
  },
  track_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  track_artist: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  track_uri: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  playlist_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
 },
}, {
  timestamps: false, 
});


export { Track };