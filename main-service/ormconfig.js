const path = require('path');
const { config } = require('dotenv/');

config({ path: path.resolve(__dirname, '../.env') });

const { PG_USER, PG_PASS, PG_DB, PG_HOST, NODE_ENV } = process.env;

module.exports = {
  type: 'postgres',
  host: PG_HOST,
  port: 5432,
  username: PG_USER,
  password: PG_PASS,
  database: PG_DB,
  synchronize: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migration/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migration',
  },
};
