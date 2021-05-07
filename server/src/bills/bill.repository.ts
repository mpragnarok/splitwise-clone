import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { Split } from 'src/splits/split.entity';
import { EntityRepository, Repository } from 'typeorm';
import { BillType } from './bill-type.enum';
import { Bill } from './bill.entity';
import { GetBillByIdDto } from './dto/bill.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { GetBillsFilterDto } from './dto/get-bills-filter.dto';
import { UpdateBillDto } from './dto/update-bill.dtc';

@EntityRepository(Bill)
export class BillRepository extends Repository<Bill> {
  private logger = new Logger('BillRepository');

  async getBills(filterDto: GetBillsFilterDto, user: User): Promise<Bill[]> {
    const { type, search } = filterDto;
    const query = this.createQueryBuilder('bill');

    query
      .leftJoinAndSelect('bill.splits', 'splits')
      .where('bill.userId = :userId', { userId: user.id });
    if (type) {
      query.andWhere('bill.type = :type', { type });
    }

    if (search) {
      // partial search
      query.andWhere(
        '(bill.title LIKE :search OR bill.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    try {
      const bills = query.getMany();
      return bills;
    } catch (err) {
      this.logger.error(
        `Failed to get bills for user "${user.username}", DTO: ${JSON.stringify(
          filterDto,
        )},`,
        err.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createBill(
    createExpenseDto: CreateExpenseDto,
    user: User,
    split: Split,
  ): Promise<Bill> {
    const { title, description, amount, type } = createExpenseDto;
    const bill = new Bill();
    bill.title = title;
    bill.description = description;
    bill.amount = Number(amount);
    bill.type = type ?? BillType.UNCATEGORIZED;
    bill.user = user;
    bill.splits = [split];

    try {
      await bill.save();
    } catch (err) {
      this.logger.error(
        `Failed to create bill for user "${
          user.username
        }", DTO: ${JSON.stringify(createExpenseDto)},`,
        err.stack,
      );
      throw new InternalServerErrorException();
    }
    delete bill.user;
    return bill;
  }

  /**
   * @description Get bill by id and user
   * @param {GetBillByIdDto} getBillById
   */
  async getBillById(getBillByIdDto: GetBillByIdDto, user: User): Promise<Bill> {
    const found = await this.findOne({
      id: getBillByIdDto.id,
      userId: user.id,
    });
    if (!found) {
      throw new NotFoundException(
        `Bill with ID ${getBillByIdDto.id} not found`,
      );
    }
    return found;
  }
  async updateBill(
    getBillByIdDto: GetBillByIdDto,
    updateBillDto: UpdateBillDto,
    user: User,
  ) {
    const bill = await this.getBillById({ id: getBillByIdDto.id }, user);
    const { title, description, amount, type } = updateBillDto;
    bill.title = title;
    bill.description = description;
    bill.amount = parseInt(amount);
    bill.type = type;
    await bill.save();
    return bill;
  }
}
