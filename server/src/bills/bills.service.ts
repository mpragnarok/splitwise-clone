import { Injectable } from '@nestjs/common';
import { Bill, BillType } from './bill.model';
import { v1 as uuid } from 'uuid';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillByIdDto } from './dto/update-bill-by-id.dtc';
import { async } from 'rxjs';
import { GetBillsFilterDto } from './dto/get-bills-filter.dto';

@Injectable()
export class BillsService {
  private bills: Bill[] = [];

  getAllBills(): Bill[] {
    return this.bills;
  }
  async getBillsWithFilters(filterDto: GetBillsFilterDto): Promise<Bill[]> {
    const { type, search } = filterDto;
    let bills: Bill[] = this.getAllBills();
    if (type) {
      bills = bills.filter((bill) => bill.type === type);
    }

    if (search) {
      bills = bills.filter(
        (bill) =>
          bill.title.includes(search) || bill.description.includes(search),
      );
    }
    return bills;
  }

  async getBillById(id: string): Promise<Bill> {
    return this.bills.find((bill) => bill.id === id);
  }

  async createBill(createBillDto: CreateBillDto): Promise<Bill> {
    const { title, description, amount, type } = createBillDto;
    const parseAmount = parseInt;
    const bill: Bill = {
      title,
      description,
      amount: parseInt(amount),
      type: type ? BillType[type] : BillType.UNCATEGORIZED,
      date: new Date(),
      paid: false,
      id: uuid(),
    };
    this.bills.push(bill);
    return bill;
  }

  async deleteBill(id: string): Promise<void> {
    this.bills = this.bills.filter((bill) => bill.id !== id);
  }

  async updateBillById(
    id: string,
    updateBillDto: UpdateBillByIdDto,
  ): Promise<Bill> {
    const { title, description, amount, type } = updateBillDto;
    const bill: Bill = await this.getBillById(id);
    bill.title = title;
    bill.description = description;
    bill.amount = parseInt(amount);
    bill.type = type;
    return bill;
  }
}
