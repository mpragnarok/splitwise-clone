import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { BillType } from '../bill.model';

export class GetBillsFilterDto {
  @IsOptional()
  @IsIn([
    BillType.ENTERTAINMENT,
    BillType.FOOD_AND_DRINK,
    BillType.HOME,
    BillType.LIFE,
    BillType.TRANSPORTATION,
    BillType.UNCATEGORIZED,
    BillType.UTILITIES,
  ])
  type: BillType;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
