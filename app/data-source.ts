import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

export const datasourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '3306'),
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [join(__dirname, '/src/**/*.entity.{ts,js}')],
  migrations: [join(__dirname, '/migrations/*.{ts,js}')],
  synchronize: Boolean(JSON.parse(process.env.SYNCHRONIZE ?? 'false')),
  dropSchema: process.env.NODE_ENV === 'test',
  logging: false,
};

export const datasource = new DataSource(datasourceOptions);
