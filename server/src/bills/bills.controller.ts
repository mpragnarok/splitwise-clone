import { Controller, Get } from '@nestjs/common';
import { BillsService } from './bills.service';

@Controller('bills')
export class BillsController {
  constructor(private billsService: BillsService) {}

  @Get()
  getAllBills() {
    this.billsService.getAllBills();
  }
}
