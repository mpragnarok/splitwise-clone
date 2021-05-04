import { Module } from '@nestjs/common';
import { SplitsService } from './splits.service';
import { SplitsController } from './splits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillRepository } from 'src/bills/bill.repository';
import { UserRepository } from 'src/auth/user.repository';
import { AuthModule } from 'src/auth/auth.module';
import { BillsModule } from 'src/bills/bills.module';

@Module({
  imports: [
    AuthModule,
    BillsModule,
    TypeOrmModule.forFeature([BillRepository, UserRepository]),
  ],
  providers: [SplitsService],
  controllers: [SplitsController],
})
export class SplitsModule {}
