import { BillType } from '../bill.model';

export class GetBillsFilterDto {
  type: BillType;
  search: string;
}
