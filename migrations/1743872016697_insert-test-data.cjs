/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  // Insert roles
  pgm.sql(`
    INSERT INTO roles (name)
    VALUES ('Родитель'), ('Ребенок');
  `);

  // Insert users
  pgm.sql(`
    INSERT INTO users (role, phone, login)
    VALUES 
    ((SELECT id FROM roles WHERE name = 'Родитель'), '77777777777', 'Папа'),
    ((SELECT id FROM roles WHERE name = 'Родитель'), '77777777778', 'Мама'),
    ((SELECT id FROM roles WHERE name = 'Ребенок'), '77777777779', 'Ребенок');
  `);

  // Insert account types
  pgm.sql(`
    INSERT INTO account_types (name)
    VALUES ('Карман'), ('Копилка'), ('Биржа');
  `);

  // Insert account statuses
  pgm.sql(`
    INSERT INTO account_statuses (name)
    VALUES ('Активен'), ('Закрыт'), ('Заблокирован');
  `);

  // Insert accounts
  pgm.sql(`
    INSERT INTO accounts (owner, type, status, name)
    VALUES (
      (SELECT id FROM users WHERE phone = '77777777779'),
      (SELECT id FROM account_types WHERE name = 'Карман'),
      (SELECT id FROM account_statuses WHERE name = 'Активен'),
      'На пучеглазую игогошку'
    );
  `);

  // Insert transaction types
  pgm.sql(`
    INSERT INTO transaction_types (name)
    VALUES ('Перевод'), ('Пополнение'), ('Списание');
  `);

  // Insert transaction statuses
  pgm.sql(`
    INSERT INTO transaction_statuses (name)
    VALUES ('В обработке'), ('В процессе'), ('Исполнено');
  `);

  // Insert transactions
  pgm.sql(`
    INSERT INTO transactions (author, account_to, type, status, amount)
    VALUES (
      (SELECT id FROM users WHERE phone = '77777777777'),
      (SELECT id FROM accounts
        WHERE owner = (SELECT id FROM users WHERE phone = '77777777779')
        AND type = (SELECT id FROM account_types WHERE name = 'Карман')),
      (SELECT id FROM transaction_types WHERE name = 'Пополнение'),
      (SELECT id FROM transaction_statuses WHERE name = 'В обработке'),
      5000000
    );
  `);

  // Insert transaction schedule
  pgm.sql(`
    INSERT INTO transaction_schedule (author, transaction, days, count, date)
    VALUES (
      (SELECT id FROM users WHERE phone = '77777777777'),
      1,
      null,
      null,
      '2023-04-05 14:30:00'
    );
  `);

  // Insert account transactions
  pgm.sql(`
    INSERT INTO account_transactions (author, transaction, account, type, status, amount)
    VALUES (
      (SELECT id FROM users WHERE phone = '77777777777'),
      1,
      (SELECT id FROM accounts
        WHERE owner = (SELECT id FROM users WHERE phone = '77777777779')
        AND type = (SELECT id FROM account_types WHERE name = 'Карман')),
      (SELECT id FROM transaction_types WHERE name = 'Пополнение'),
      (SELECT id FROM transaction_statuses WHERE name = 'В обработке'),
      50000
    );
  `);

  // Insert study material types
  pgm.sql(`
    INSERT INTO study_material_types (name) 
    VALUES ('Книга'), ('Видео'), ('Аудио');
  `);

  // Insert study materials
  pgm.sql(`
    INSERT INTO study_materials (type, account_type, title, description)
    VALUES (
      (SELECT id FROM study_material_types WHERE name = 'Книга'),
      (SELECT id FROM account_types WHERE name = 'Карман'),
      'Как заработать миллион за день?',
      'Никто не знает. А если и знает, то не скажет'
    );
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  // Clear all data
  pgm.sql(`TRUNCATE 
    study_materials, 
    study_material_types,
    account_transactions,
    transaction_schedule,
    transactions,
    transaction_statuses,
    transaction_types,
    accounts,
    account_statuses,
    account_types,
    users,
    roles
    CASCADE;
  `);
};
