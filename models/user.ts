import { DataTypes } from 'sequelize';
import { sequelize } from '../database';
import { Playlist } from './playlist';
import { Task } from './task';

const User = sequelize.define('User', {
  spotify_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true,
  },
  access_token: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  refresh_token: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

User.hasMany(Playlist, { foreignKey: 'spotify_id' });
User.hasMany(Task, { foreignKey: 'spotify_id' });

export { User };