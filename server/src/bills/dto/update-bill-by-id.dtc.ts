import { Param } from '@nestjs/common';
import { BillType } from '../bill.model';
export class UpdateBillByIdDto {
  title: string;
  description: string;
  amount: string;
  type: BillType;
  paid: boolean;
}
