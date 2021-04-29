import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dtc';
import { GetBillsFilterDto } from './dto/get-bills-filter.dto';
import { BillRepository } from './bill.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from './bill.entity';
import { BillType } from './bill-type.enum';
import { DeleteResult } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(BillRepository)
    private billRepository: BillRepository,
  ) {}

  getBills(filterDto: GetBillsFilterDto, user: User): Promise<Bill[]> {
    return this.billRepository.getBills(filterDto, user);
  }

  async getBillById(id: number, user: User): Promise<Bill> {
    const found = await this.billRepository.findOne({ id, userId: user.id });
    if (!found) {
      throw new NotFoundException(`Bill with ID ${id} not found`);
    }
    return found;
  }
  async createBill(createBillDto: CreateBillDto, user: User): Promise<Bill> {
    return this.billRepository.createBill(createBillDto, user);
  }

  async deleteBill(id: number, user: User): Promise<void> {
    const result = await this.billRepository.delete({ id, userId: user.id });
    console.log(result);
    if (result.affected === 0) {
      throw new NotFoundException(`Bill with ID ${id} not found`);
    }
  }
  async updateBill(
    id: number,
    updateBillDto: UpdateBillDto,
    user: User,
  ): Promise<Bill> {
    const bill = await this.getBillById(id, user);
    const { title, description, amount, type } = updateBillDto;
    bill.title = title;
    bill.description = description;
    bill.amount = parseInt(amount);
    bill.type = type;
    await bill.save();

    return bill;
  }
}
