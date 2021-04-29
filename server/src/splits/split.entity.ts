import { User } from 'src/auth/user.entity';
import { Bill } from 'src/bills/bill.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SplitType } from './split-type.enum';
@Entity()
export class Split extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  splitAmount: number;
  @Column()
  splitType: SplitType;
  @Column()
  billId: number;
  @Column()
  recipientId: number;
  // @ManyToOne((type) => Bill, (bill) => bill.splits, { eager: false })
  // @JoinColumn({ name: 'billId' })
  // bill: Bill;

  // @ManyToOne((type) => User, (user) => user.splits, { eager: false })
  // @JoinColumn({ name: 'recipientId' })
  // user: User;
}
