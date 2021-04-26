import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillRepository } from './bill.repository';
import { BillsController } from './bills.controller';
import { BillsService } from './bills.service';

@Module({
  imports: [TypeOrmModule.forFeature([BillRepository])],
  controllers: [BillsController],
  providers: [BillsService],
})
export class BillsModule {}
