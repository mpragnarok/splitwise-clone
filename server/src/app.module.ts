import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BillsModule } from './bills/bills.module';
import { typeOrmConfig } from './config/typeorm.config';
import { SplitsModule } from './splits/splits.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), BillsModule, AuthModule, SplitsModule],
})
export class AppModule {}
