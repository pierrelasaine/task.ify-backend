import { Sequelize } from 'sequelize';
import { Pool, PoolClient } from 'pg';

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST, 
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: 5432
  });
  

  const sequelize = new Sequelize({
    dialect: 'postgres',
    dialectModule: {
      create: () => pool.connect(),
      destroy: (client: PoolClient) => client.release(),
    },
  });

export { sequelize, pool };
  
