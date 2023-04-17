import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';

import {
  DEFAULT_EXPRESS_PORT,
  DEFAULT_POSTGRES_PORT,
  DEFAULT_POSTGRES_HOST,
} from './utils/constants';

// Setup
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

// Ports
const expressPort = Number(process.env.EXPRESS_PORT) || DEFAULT_EXPRESS_PORT;
const postgresPort = Number(process.env.POSTGRES_PORT) || DEFAULT_POSTGRES_PORT;

// PostgreSQL Pool
export const pool = new Pool({
  host: process.env.DB_HOST || DEFAULT_POSTGRES_HOST,
  user: process.env.DB_USER || '',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || '',
  port: postgresPort,
});

// Validating PostgreSQL Connection
pool
  .connect()
  .then(() => {
    console.log(`[STATUS] PostgreSQL working on port ${postgresPort}...`);
  })
  .catch((err) => {
    console.log(err);
    console.log(`[ERROR] PostgreSQL is not running!`);
  });

// Express Server
app.listen(expressPort, () => {
  console.log(`[STATUS] Express listening on port ${expressPort}...`);
});
