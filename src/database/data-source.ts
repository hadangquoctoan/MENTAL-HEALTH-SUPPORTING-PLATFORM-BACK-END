import 'reflect-metadata';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { entities } from './entities';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'appuser',
  password: process.env.DB_PASSWORD || '12345',
  database: process.env.DB_NAME || 'mental_health_db',
  entities,
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
});
