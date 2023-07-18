import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

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

module.exports = User;