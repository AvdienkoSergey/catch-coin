# Catch Coin

## Docker

### Setup

1. Create or edit a `.env` file with these variables:
   ```
   PG_USER=your_username
   PG_PASSWORD=your_password
   PG_DATABASE=your_database_name
   DB_PORT=5432
   ```

2. Start the database:
   ```
   docker-compose up -d
   ```

3. Stop the database:
   ```
   docker-compose down
   ```

### Connecting to Database

The PostgreSQL database is available at:
- Host: localhost
- Port: The value of DB_PORT in your .env file (default 5432)
- Username: PG_USER value
- Password: PG_PASSWORD value
- Database: PG_DATABASE value

### Data Storage

All database data is stored in the `postgres_data` volume, so your data will not be lost when containers are restarted.