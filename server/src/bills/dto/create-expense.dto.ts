import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
} from 'class-validator';
import { SplitType } from 'src/splits/split-type.enum';
import { BillType } from '../bill-type.enum';
export class CreateExpenseDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNumberString()
  amount: number;
  @IsOptional()
  @IsEnum(BillType)
  type?: BillType;
  @IsNumberString()
  splitAmount: number;
  @IsEnum(SplitType)
  splitType: SplitType;
  @IsNumber()
  payerId: number;
}
