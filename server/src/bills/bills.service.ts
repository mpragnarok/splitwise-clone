import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateBillDto } from './dto/update-bill.dtc';
import { GetBillsFilterDto } from './dto/get-bills-filter.dto';
import { BillRepository } from './bill.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from './bill.entity';
import { BillType } from './bill-type.enum';
import { DeleteResult } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { SplitRepository } from 'src/splits/split.repository';
import { Split } from 'src/splits/split.entity';
import { UserRepository } from 'src/auth/user.repository';
import { GetBillByIdDto } from './dto/bill.dto';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(BillRepository)
    private billRepository: BillRepository,
    private splitRepository: SplitRepository,
    private userRepository: UserRepository,
  ) {}

  getBills(filterDto: GetBillsFilterDto, user: User): Promise<Bill[]> {
    return this.billRepository.getBills(filterDto, user);
  }

  async getBillById(id: number, user: User): Promise<Bill> {
    const bill = await this.billRepository.getBillById({ id }, user);
    return bill;
  }
  async createBill(
    createExpenseDto: CreateExpenseDto,
    user: User,
  ): Promise<Bill> {
    const { payerId } = createExpenseDto;
    const payer = await this.userRepository.findOne({ id: payerId });
    const split = await this.splitRepository.createSplit(
      createExpenseDto,
      payer,
    );
    const bill = await this.billRepository.createBill(
      createExpenseDto,
      user,
      split,
    );

    return bill;
  }

  async deleteBill(id: number, user: User): Promise<void> {
    const result = await this.billRepository.delete({ id, userId: user.id });
    console.log(result);
    if (result.affected === 0) {
      throw new NotFoundException(`Bill with ID ${id} not found`);
    }
  }
  async updateBill(
    getBillByIdDto: GetBillByIdDto,
    updateBillDto: UpdateBillDto,
    user: User,
  ): Promise<Bill> {
    const bill = await this.billRepository.updateBill(
      getBillByIdDto,
      updateBillDto,
      user,
    );

    return bill;
  }
}
