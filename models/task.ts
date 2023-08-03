import { DataTypes } from 'sequelize';
import { sequelize } from '../database';
import { Playlist } from './playlist';

const Task = sequelize.define('tasks', {
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
  spotify_id: {
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

Task.belongsTo(Playlist, { foreignKey: 'playlist_id' });

export { Task };