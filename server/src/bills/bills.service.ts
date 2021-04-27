import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dtc';
import { GetBillsFilterDto } from './dto/get-bills-filter.dto';
import { BillRepository } from './bill.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from './bill.entity';
import { BillType } from './bill-type.enum';
import { DeleteResult } from 'typeorm';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(BillRepository)
    private billRepository: BillRepository,
  ) {}

  getBills(filterDto: GetBillsFilterDto): Promise<Bill[]> {
    return this.billRepository.getBills(filterDto);
  }

  async getBillById(id: number): Promise<Bill> {
    const found = await this.billRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Bill with ID ${id} not found`);
    }
    return found;
  }
  async createBill(createBillDto: CreateBillDto): Promise<Bill> {
    return this.billRepository.createBill(createBillDto);
  }

  async deleteBill(id: number): Promise<void> {
    const result = await this.billRepository.delete(id);
    console.log(result);
    if (result.affected === 0) {
      throw new NotFoundException(`Bill with ID ${id} not found`);
    }
  }
  async updateBill(id: number, updateBillDto: UpdateBillDto): Promise<Bill> {
    const bill = await this.getBillById(id);
    const { title, description, amount, type } = updateBillDto;
    bill.title = title;
    bill.description = description;
    bill.amount = parseInt(amount);
    bill.type = type;
    await bill.save();

    return bill;
  }
}
