import { Sequelize } from 'sequelize';
import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST, 
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: 5432
  });
  

const sequelize = new Sequelize({
    dialect: 'postgres',
    dialectModule: require('pg'),
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 5432
});

export { sequelize, pool };
  
