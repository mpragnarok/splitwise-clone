import { BillType } from '../bill.model';

export class CreateBillDto {
  title: string;
  description: string;
  amount: string;
  type?: BillType;
}
