import { Module } from '@nestjs/common';
import { BillsModule } from './bills/bills.module';

@Module({
  imports: [BillsModule],
})
export class AppModule {}
