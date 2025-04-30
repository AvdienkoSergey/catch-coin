import path from 'node:path'; 
import config from './config.js';  
import migrate from 'node-pg-migrate';

// Set the correct migrations directory path
const migrationsDir = path.resolve('./migrations');

// Create database URL from environment variables or defaults
const dbHost = config.db.host;
const dbPort = config.db.port;
const dbName = config.db.database;
const dbUser = config.db.user;
const dbPassword = config.db.password;

migrate({
  direction: 'down',
  migrationsTable: 'pgmigrations',
  dir: migrationsDir,
  databaseUrl: `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`
})
.then(() => {
  console.log('Migration down completed successfully!');
})
.catch(err => {
  console.error('Migration down error:', err);
}); 