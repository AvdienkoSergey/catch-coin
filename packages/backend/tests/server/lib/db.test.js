// db.test.js
import { createSandbox } from 'sinon';
import { strict as assert } from 'assert';
import { crud } from '@catch-coin/backend-server/lib/db.js';

describe('CRUD Module', function() {
  let sandbox;
  let fakePool;
  let crudInstance;
  const table = 'test_table';

  beforeEach(function() {
    sandbox = createSandbox();
    fakePool = { query: sandbox.stub() };
    crudInstance = crud(fakePool)(table);
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('should call pool.query with correct SQL in read() when no id is provided', async function() {
    fakePool.query.resolves({ rows: [{ id: 1, name: 'test' }] });
    const result = await crudInstance.read();
    assert(fakePool.query.calledOnce, 'pool.query should be called once');
    const expectedSQL = `SELECT * FROM ${table}`;
    assert.strictEqual(fakePool.query.firstCall.args[0], expectedSQL, 'SQL should match');
    assert.deepStrictEqual(result, { rows: [{ id: 1, name: 'test' }] });
  });

  it('should call pool.query with correct SQL and parameters in read() when id is provided', async function() {
    fakePool.query.resolves({ rows: [{ id: 2, name: 'example' }] });
    const id = 2;
    await crudInstance.read(id);
    const expectedSQL = `SELECT * FROM ${table} WHERE id = $1`;
    assert(fakePool.query.calledOnce, 'pool.query should be called once');
    assert.strictEqual(fakePool.query.firstCall.args[0], expectedSQL, 'SQL should match');
    assert.deepStrictEqual(fakePool.query.firstCall.args[1], [id], 'Parameters should match');
  });

  it('should read specific fields when fields array is provided', async function() {
    fakePool.query.resolves({ rows: [{ name: 'test', email: 'test@example.com' }] });
    const id = 5;
    await crudInstance.read(id, ['name', 'email']);
    const expectedSQL = `SELECT name, email FROM ${table} WHERE id = $1`;
    assert(fakePool.query.calledOnce, 'pool.query should be called once');
    assert.strictEqual(fakePool.query.firstCall.args[0], expectedSQL, 'SQL should match');
    assert.deepStrictEqual(fakePool.query.firstCall.args[1], [id], 'Parameters should match');
  });

  it('should call pool.query with correct SQL and parameters in create()', async function() {
    fakePool.query.resolves({ rows: [{ id: 3, name: 'John', email: 'john@example.com' }] });
    const data = { name: 'John', email: 'john@example.com' };
    await crudInstance.create(data);
    const expectedSQL = `INSERT INTO "${table}" ("name", "email") VALUES ($1, $2)`;
    assert(fakePool.query.calledOnce, 'pool.query should be called once');
    assert.strictEqual(fakePool.query.firstCall.args[0], expectedSQL, 'SQL should match');
    assert.deepStrictEqual(fakePool.query.firstCall.args[1], ['John', 'john@example.com'], 'Parameters should match');
  });

  it('should call pool.query with correct SQL and parameters in update()', async function() {
    fakePool.query.resolves({ rows: [{ id: 5, name: 'John', email: 'john@example.com' }] });
    const id = 5;
    const data = { name: 'John', email: 'john@example.com' };
    await crudInstance.update(id, data);
    const expectedSQL = `UPDATE ${table} SET name = $1, email = $2 WHERE id = $3`;
    assert(fakePool.query.calledOnce, 'pool.query should be called once');
    assert.strictEqual(fakePool.query.firstCall.args[0], expectedSQL, 'SQL should match');
    assert.deepStrictEqual(fakePool.query.firstCall.args[1], ['John', 'john@example.com', id], 'Parameters should match');
  });

  it('should call pool.query with correct SQL and parameters in delete()', async function() {
    fakePool.query.resolves({ rows: [] });
    const id = 5;
    await crudInstance.delete(id);
    const expectedSQL = `DELETE FROM ${table} WHERE id = $1`;
    assert(fakePool.query.calledOnce, 'pool.query should be called once');
    assert.strictEqual(fakePool.query.firstCall.args[0], expectedSQL, 'SQL should match');
    assert.deepStrictEqual(fakePool.query.firstCall.args[1], [id], 'Parameters should match');
  });

  it('should call pool.query with correct SQL and parameters in query()', async function() {
    fakePool.query.resolves({ rows: [{ id: 1, name: 'test', age: 25 }] });
    const customSQL = `SELECT * FROM ${table} WHERE age > $1`;
    const params = [18];
    await crudInstance.query(customSQL, params);
    assert(fakePool.query.calledOnce, 'pool.query should be called once');
    assert.strictEqual(fakePool.query.firstCall.args[0], customSQL, 'SQL should match');
    assert.deepStrictEqual(fakePool.query.firstCall.args[1], params, 'Parameters should match');
  });
});
