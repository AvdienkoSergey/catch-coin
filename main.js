import config from './config.js';
import logger from './lib/logger.js';
import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  host: config.db.host,
  port: config.db.port,
  database: config.pg.database,
  user: config.pg.user,
  password: config.pg.password
});

client.connect()
  .then(() => logger.log('Connected to database!'))
  .catch(err => logger.error(err))
  .finally(() => client.end());