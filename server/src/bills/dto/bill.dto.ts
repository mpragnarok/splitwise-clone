import { IsNumber, IsNumberString } from 'class-validator';

class GetBillBaseDto {
  @IsNumber()
  id: number;
}

export class GetBillByIdDto extends GetBillBaseDto {}
