import { IsOptional } from 'class-validator';
import { BillType } from '../bill-type.enum';
export class UpdateBillDto {
  @IsOptional()
  title?: string;
  @IsOptional()
  description?: string;
  @IsOptional()
  amount: string;
  @IsOptional()
  type: BillType;
  @IsOptional()
  paid: boolean;
}
