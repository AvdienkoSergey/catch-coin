# Catch Coin

## Docker

### Setup

1. Create or edit a `.env` file with these variables:
   ```
   DB_HOST=your_host
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_DATABASE=your_database_name
   DB_PORT=your_port
   ```

2. Initialize:
    ```
    docker-compose up -d
    ```

3. Start the database:
   ```
   docker-compose ps
   ```

4. Stop the database:
   ```
   docker-compose down
   ```

### Connecting to Database

The PostgreSQL database is available at:
- Host: DB_HOST value or localhost
- Port: DB_PORT value or 5432
- Username: DB_USER value
- Password: DB_PASSWORD value
- Database: DB_DATABASE value

### Data Storage

All database data is stored in the `postgres_data` volume, so your data will not be lost when containers are restarted.