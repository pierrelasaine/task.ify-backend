import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

const Song = sequelize.define('Song', {
  song_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true,
  },
  song_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  spotify_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
 },
});

module.exports = Song;