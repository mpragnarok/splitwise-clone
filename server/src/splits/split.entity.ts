import { User } from 'src/auth/user.entity';
import { Bill } from 'src/bills/bill.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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

  @ManyToOne(() => User, (user) => user.splits)
  @JoinColumn()
  payer: User;
  @ManyToOne((type) => Bill, (bill) => bill.splits, { eager: false })
  bill: Bill;
}
