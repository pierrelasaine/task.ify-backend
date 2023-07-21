import { DataTypes } from 'sequelize';
import { sequelize } from '../database';
import { Playlist } from './playlist';

const Task = sequelize.define('Task', {
  task_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  task_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  timer: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  vibe: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  playlist_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

Task.belongsTo(Playlist, { foreignKey: 'playlist_id' });

export { Task };