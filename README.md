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

### Migrations

Migrations are stored in the `database/migrations` directory.

To create a new migration, run the following command:

### Conventional Commits-стиль

`feat`: Для нового функционала.
Пример: feat(auth): add OAuth login

`fix`: Для исправления багов.
Пример: fix(api): handle null response correctly

`docs`: Для изменений в документации.
Пример: docs(readme): update installation instructions

`style`: Для изменений, не влияющих на логику (форматирование, отступы, изменение порядка файлов и т.п.).
Пример: style(app): updated file order

`refactor`: Для изменений в коде, улучшающих структуру, но не добавляющих нового функционала и не исправляющих баги.
Пример: refactor(utils): simplify helper functions

`perf`: Для оптимизаций, влияющих на производительность.
Пример: perf(db): improve query performance

`test`: Для добавления или изменения тестов.
Пример: test(api): add tests for error scenarios

`build`: Для изменений, влияющих на сборку или зависимости.
Пример: build(deps): update webpack to v5

`ci`: Для изменений в конфигурациях CI/CD.
Пример: ci(github-actions): add new workflow for release

`chore`: Для вспомогательных изменений, не влияющих на исходный код или тесты (обновление документации, утилитарные скрипты и т.д.).
Пример: chore: update dependencies