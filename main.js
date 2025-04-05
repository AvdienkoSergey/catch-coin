import config from './config.js';
import logger from './lib/logger.js';
import { db } from './lib/db.js';

const client = db({
  host: config.db.host,
  port: config.db.port,
  database: config.pg.database,
  user: config.pg.user,
  password: config.pg.password
});

logger.log('Connecting to database...', client.toString());
const catchCoin = client('sometable');

const time = await catchCoin.query('SELECT NOW()');
logger.log(time);