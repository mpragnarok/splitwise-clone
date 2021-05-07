import { Module } from '@nestjs/common';
import { SplitsService } from './splits.service';
import { SplitsController } from './splits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillRepository } from 'src/bills/bill.repository';
import { UserRepository } from 'src/auth/user.repository';
import { AuthModule } from 'src/auth/auth.module';
import { SplitRepository } from './split.repository';
import { BillsService } from 'src/bills/bills.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([BillRepository, UserRepository, SplitRepository]),
  ],
  providers: [SplitsService, BillsService],
  controllers: [SplitsController],
})
export class SplitsModule {}
