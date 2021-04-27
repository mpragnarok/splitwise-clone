import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
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
}
