import * as dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT,
  JWT_KEY: process.env.JWT_KEY,
  DB_URL: process.env.DB_URL_LOCAL,
};
