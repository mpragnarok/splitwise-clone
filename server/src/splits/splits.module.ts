import { Module } from '@nestjs/common';
import { SplitsService } from './splits.service';
import { SplitsController } from './splits.controller';

@Module({
  providers: [SplitsService],
  controllers: [SplitsController]
})
export class SplitsModule {}
