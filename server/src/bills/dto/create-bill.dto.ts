import { BillType } from '../bill.model';
import { IsNotEmpty } from 'class-validator';
export class CreateBillDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  amount: string;
  type?: BillType;
}
