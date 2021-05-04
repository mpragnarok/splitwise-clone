import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { config } from '../../config';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: config.DB_SETTINGS.host,
  port: config.DB_SETTINGS.port,
  username: config.DB_SETTINGS.username,
  password: config.DB_SETTINGS.password,
  database: config.DB_SETTINGS.database,
  synchronize: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
};
