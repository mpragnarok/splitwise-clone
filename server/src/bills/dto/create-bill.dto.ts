import { IsNotEmpty, IsOptional } from 'class-validator';
import { BillType } from '../bill-type.enum';
export class CreateBillDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  amount: number;
  @IsOptional()
  type?: BillType;
}
