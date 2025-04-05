import config from './config.js';
import logger from './lib/logger.js';
import { db } from './lib/db.js';

const pool = db({
  host: config.db.host,
  port: config.db.port,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password
});

const rolesTable = pool('roles');
const allRoles = await rolesTable.query('SELECT * FROM roles')
logger.log(allRoles);

const usersTable = pool('users');
const allUsers = await usersTable.query('SELECT * FROM users')
logger.log(allUsers);

const accountsTable = pool('accounts');
const allAccounts = await accountsTable.query('SELECT * FROM accounts')
logger.log(allAccounts);