import { defineConfig, env } from 'prisma/config';
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const user = env('POSTGRES_USER');
const password = env('POSTGRES_PASSWORD');
const host = env('POSTGRES_HOST');
const port = env('POSTGRES_PORT');
const db = env('POSTGRES_DB');

const url = `postgresql://${user}:${password}@${host}:${port}/${db}`;
console.log('---> ', url);
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  engine: 'classic',
  datasource: { url },
});
