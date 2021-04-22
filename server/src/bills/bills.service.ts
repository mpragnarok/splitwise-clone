import { Injectable } from '@nestjs/common';

@Injectable()
export class BillsService {
  private bills = [{}];

  getAllBills() {
    return this.bills;
  }
}
