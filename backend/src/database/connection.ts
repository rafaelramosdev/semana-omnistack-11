import knex from 'knex';

import path from 'path';

const db = process.env.NODE_ENV === 'test' ? (
  knex({
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'test.sqlite')
    },
    migrations: {
      directory: path.resolve(__dirname, 'migrations')
    },
    useNullAsDefault: true,
  })
) : (
  knex({
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true,
  })
);

export default db;