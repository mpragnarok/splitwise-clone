import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { UserRepository } from 'src/auth/user.repository';
import { Bill } from 'src/bills/bill.entity';
import { CreateExpenseDto } from 'src/bills/dto/create-expense.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Split } from './split.entity';

@EntityRepository(Split)
export class SplitRepository extends Repository<Split> {
  private logger = new Logger('SplitRepository');
  async createSplit(
    createExpenseDto: CreateExpenseDto,
    payer: User,
    // bill: Bill,
  ): Promise<Split> {
    const { splitAmount, splitType } = createExpenseDto;
    const split = new Split();
    split.splitAmount = splitAmount;
    split.splitType = splitType;
    split.payer = payer;
    try {
      await split.save();
    } catch (err) {
      this.logger.error(
        `Failed to create split for payer "${
          payer.username
        }", DTO: ${JSON.stringify(createExpenseDto)},`,
        err.stack,
      );
      throw new InternalServerErrorException();
    }
    delete split.payer.token;
    delete split.payer.bills;
    return split;
  }

  async updateSplit(splits: Split[]) {
    const [split] = splits;
  }
}
