import { IsNumber } from 'class-validator';

class GetBillBaseDto {
  @IsNumber()
  id: number;
}

export class GetBillByIdDto extends GetBillBaseDto {}
