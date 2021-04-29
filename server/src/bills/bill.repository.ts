import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { BillType } from './bill-type.enum';
import { Bill } from './bill.entity';
import { CreateBillDto } from './dto/create-bill.dto';
import { GetBillsFilterDto } from './dto/get-bills-filter.dto';

@EntityRepository(Bill)
export class BillRepository extends Repository<Bill> {
  async getBills(filterDto: GetBillsFilterDto, user: User): Promise<Bill[]> {
    const { type, search } = filterDto;
    const query = this.createQueryBuilder('bill');

    query.where('bill.userId=:userId', { userId: user.id });
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
    const bills = query.getMany();
    return bills;
  }
  async createBill(createBillDto: CreateBillDto, user: User): Promise<Bill> {
    const { title, description, amount, type } = createBillDto;
    const bill = new Bill();
    bill.title = title;
    bill.description = description;
    bill.amount = amount;
    bill.type = type ?? BillType.UNCATEGORIZED;
    bill.user = user;
    await bill.save();
    delete bill.user;
    return bill;
  }
}
