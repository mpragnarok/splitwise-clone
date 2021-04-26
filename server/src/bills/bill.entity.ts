import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BillType } from './bill.model';
@Entity()
export class Bill extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  amount: number;
  @Column()
  date: Date;
  @Column()
  description: string;
  @Column()
  paid: boolean;
  @Column()
  type: BillType;
}
