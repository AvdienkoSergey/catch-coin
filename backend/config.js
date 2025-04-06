import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const environment = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${environment}`), override: true });

const config = {
    static: {
      port: process.env.STATIC_PORT,
    },
    api: {
      port: process.env.API_PORT,
      transport: process.env.API_TRANSPORT,
    },
    sandbox: {
      timeout: process.env.SANDBOX_TIMEOUT,
      displayErrors: process.env.SANDBOX_DISPLAY_ERRORS,
    },
    db: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    }
  };
  
  export default config;