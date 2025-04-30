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
  // Create roles table
  pgm.createTable('roles', {
    id: { type: 'SERIAL', primaryKey: true },
    name: { type: 'VARCHAR(20)', notNull: true, unique: true },
  });

  // Create users table
  pgm.createTable('users', {
    id: { type: 'SERIAL', primaryKey: true },
    role: { type: 'INT', notNull: true },
    phone: { type: 'VARCHAR(20)', notNull: true, unique: true },
    login: { type: 'VARCHAR(20)', notNull: true },
  });

  pgm.addConstraint('users', 'fk_users_role', {
    foreignKeys: {
      columns: 'role',
      references: 'roles(id)',
      onDelete: 'CASCADE',
    },
  });

  // Create account_types table
  pgm.createTable('account_types', {
    id: { type: 'SERIAL', primaryKey: true },
    name: { type: 'VARCHAR(20)', notNull: true, unique: true },
  });

  // Create account_statuses table
  pgm.createTable('account_statuses', {
    id: { type: 'SERIAL', primaryKey: true },
    name: { type: 'VARCHAR(20)', notNull: true, unique: true },
  });

  // Create accounts table
  pgm.createTable('accounts', {
    id: { type: 'SERIAL', primaryKey: true },
    owner: { type: 'INT', notNull: true },
    type: { type: 'INT', notNull: true },
    status: { type: 'INT', notNull: true },
    name: { type: 'VARCHAR(50)', notNull: true },
    balance: { type: 'NUMERIC(15,2)', notNull: true, default: 0 },
    created_at: { type: 'TIMESTAMP', notNull: true, default: pgm.func('CURRENT_TIMESTAMP') },
    updated_at: { type: 'TIMESTAMP', notNull: true, default: pgm.func('CURRENT_TIMESTAMP') },
  });

  pgm.addConstraint('accounts', 'fk_accounts_user', {
    foreignKeys: {
      columns: 'owner',
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint('accounts', 'fk_accounts_type', {
    foreignKeys: {
      columns: 'type',
      references: 'account_types(id)',
      onDelete: 'RESTRICT',
    },
  });

  pgm.addConstraint('accounts', 'fk_accounts_status', {
    foreignKeys: {
      columns: 'status',
      references: 'account_statuses(id)',
      onDelete: 'RESTRICT',
    },
  });

  // Create transaction_types table
  pgm.createTable('transaction_types', {
    id: { type: 'SERIAL', primaryKey: true },
    name: { type: 'VARCHAR(20)', notNull: true, unique: true },
  });

  // Create transaction_statuses table
  pgm.createTable('transaction_statuses', {
    id: { type: 'SERIAL', primaryKey: true },
    name: { type: 'VARCHAR(20)', notNull: true, unique: true },
  });

  // Create transactions table
  pgm.createTable('transactions', {
    id: { type: 'SERIAL', primaryKey: true },
    author: { type: 'INT', notNull: true },
    account_to: { type: 'INT', default: null },
    account_from: { type: 'INT', default: null },
    type: { type: 'INT', notNull: true },
    status: { type: 'INT', notNull: true },
    canceled: { type: 'BOOLEAN', notNull: true, default: false },
    created_at: { type: 'TIMESTAMP', notNull: true, default: pgm.func('CURRENT_TIMESTAMP') },
    updated_at: { type: 'TIMESTAMP', default: null },
    canceled_at: { type: 'TIMESTAMP', default: null },
    retry_time: { type: 'TIMESTAMP', notNull: true, default: pgm.func('CURRENT_TIMESTAMP') },
    amount: { type: 'NUMERIC(15,2)', notNull: true },
  });

  pgm.addConstraint('transactions', 'fk_transaction_user', {
    foreignKeys: {
      columns: 'author',
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint('transactions', 'fk_transaction_account_to', {
    foreignKeys: {
      columns: 'account_to',
      references: 'accounts(id)',
      onDelete: 'SET NULL',
    },
  });

  pgm.addConstraint('transactions', 'fk_transaction_account_from', {
    foreignKeys: {
      columns: 'account_from',
      references: 'accounts(id)',
      onDelete: 'SET NULL',
    },
  });

  pgm.addConstraint('transactions', 'fk_transaction_type', {
    foreignKeys: {
      columns: 'type',
      references: 'transaction_types(id)',
      onDelete: 'RESTRICT',
    },
  });

  pgm.addConstraint('transactions', 'fk_transaction_statuses', {
    foreignKeys: {
      columns: 'status',
      references: 'transaction_statuses(id)',
      onDelete: 'RESTRICT',
    },
  });

  // Create transaction_schedule table
  pgm.createTable('transaction_schedule', {
    id: { type: 'SERIAL', primaryKey: true },
    author: { type: 'INT', notNull: true },
    transaction: { type: 'INT', notNull: true },
    days: { type: 'INT', default: null },
    date: { type: 'TIMESTAMP', default: null },
    count: { type: 'INT', default: null },
  });

  pgm.addConstraint('transaction_schedule', 'fk_transaction_schedule_user', {
    foreignKeys: {
      columns: 'author',
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint('transaction_schedule', 'fk_transaction_schedule_transaction', {
    foreignKeys: {
      columns: 'transaction',
      references: 'transactions(id)',
      onDelete: 'CASCADE',
    },
  });

  // Create account_transactions table
  pgm.createTable('account_transactions', {
    id: { type: 'SERIAL', primaryKey: true },
    author: { type: 'INT', notNull: true },
    transaction: { type: 'INT', notNull: true },
    account: { type: 'INT', default: null },
    type: { type: 'INT', notNull: true },
    status: { type: 'INT', notNull: true },
    created_at: { type: 'TIMESTAMP', notNull: true, default: pgm.func('CURRENT_TIMESTAMP') },
    updated_at: { type: 'TIMESTAMP', default: null },
    retry_time: { type: 'TIMESTAMP', notNull: true, default: pgm.func('CURRENT_TIMESTAMP') },
    amount: { type: 'NUMERIC(15,2)', notNull: true },
  });

  pgm.addConstraint('account_transactions', 'fk_account_transactions_user', {
    foreignKeys: {
      columns: 'author',
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint('account_transactions', 'fk_account_transactions_account', {
    foreignKeys: {
      columns: 'account',
      references: 'accounts(id)',
      onDelete: 'SET NULL',
    },
  });

  pgm.addConstraint('account_transactions', 'fk_account_transactions_transactions', {
    foreignKeys: {
      columns: 'transaction',
      references: 'transactions(id)',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint('account_transactions', 'fk_account_transactions_type', {
    foreignKeys: {
      columns: 'type',
      references: 'transaction_types(id)',
      onDelete: 'RESTRICT',
    },
  });

  pgm.addConstraint('account_transactions', 'fk_account_transactions_status', {
    foreignKeys: {
      columns: 'status',
      references: 'transaction_statuses(id)',
      onDelete: 'RESTRICT',
    },
  });

  // Create study_material_types table
  pgm.createTable('study_material_types', {
    id: { type: 'SERIAL', primaryKey: true },
    name: { type: 'VARCHAR(20)', notNull: true, unique: true },
  });

  // Create study_materials table
  pgm.createTable('study_materials', {
    id: { type: 'SERIAL', primaryKey: true },
    account_type: { type: 'INT', notNull: true },
    type: { type: 'INT', notNull: true },
    title: { type: 'VARCHAR(100)', notNull: true },
    created_at: { type: 'TIMESTAMP', notNull: true, default: pgm.func('CURRENT_TIMESTAMP') },
    description: { type: 'TEXT' },
  });

  pgm.addConstraint('study_materials', 'fk_study_material_type', {
    foreignKeys: {
      columns: 'type',
      references: 'study_material_types(id)',
      onDelete: 'RESTRICT',
    },
  });

  pgm.addConstraint('study_materials', 'fk_study_material_account_type', {
    foreignKeys: {
      columns: 'account_type',
      references: 'account_types(id)',
      onDelete: 'RESTRICT',
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  // Drop tables in reverse order
  pgm.dropTable('study_materials');
  pgm.dropTable('study_material_types');
  pgm.dropTable('account_transactions');
  pgm.dropTable('transaction_schedule');
  pgm.dropTable('transactions');
  pgm.dropTable('transaction_statuses');
  pgm.dropTable('transaction_types');
  pgm.dropTable('accounts');
  pgm.dropTable('account_statuses');
  pgm.dropTable('account_types');
  pgm.dropTable('users');
  pgm.dropTable('roles');
};