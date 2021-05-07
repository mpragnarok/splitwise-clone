import { User } from 'src/auth/user.entity';
import { Split } from 'src/splits/split.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BillType } from './bill-type.enum';
@Entity()
export class Bill extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  amount: number;
  @UpdateDateColumn()
  updatedDate: Date;
  @CreateDateColumn()
  createdDate: Date;
  @Column()
  description: string;
  @Column({ default: false })
  paid: boolean;
  @Column()
  type: BillType;
  @Column()
  title: string;
  @ManyToOne((type) => User, (user) => user.bills, { eager: false })
  user: User;
  @Column()
  userId: number;
  @OneToMany((type) => Split, (split) => split.bill, { eager: true })
  @JoinColumn()
  splits: Split[];
}
