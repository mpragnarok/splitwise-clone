import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BillRepository } from './bill.repository';
import { BillsController } from './bills.controller';
import { BillsService } from './bills.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([BillRepository])],
  controllers: [BillsController],
  providers: [BillsService],
})
export class BillsModule {}
