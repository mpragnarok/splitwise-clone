import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'au4a83',
  database: 'splitwise-clone',
  autoLoadEntities: true,
  synchronize: true,
};
