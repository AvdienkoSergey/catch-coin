type QueryResult = Promise<object[]>;

function deleteRecord(id: number): QueryResult;

declare const db: (options: {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}) => ({
  query(sql: string, args: Array<string>): QueryResult;
  read(id: number, fields: Array<string>): QueryResult;
  create(record: object): QueryResult;
  update(id: number, record: object): QueryResult;
  delete(id: number): QueryResult;
});

export default db;