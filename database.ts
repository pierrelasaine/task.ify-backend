import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: 5432,
  dialectOptions: {
    // SSL is required to connect to a Heroku Postgres database
    ssl: {
      require: true,
      rejectUnauthorized: false, // required to handle self-signed certificate issue with Heroku Postgres
    }
  }
});

export { sequelize };
