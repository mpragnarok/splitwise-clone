import { User } from 'src/auth/user.entity';
import { Split } from 'src/splits/split.entity';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
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

  /**
   * @description Relationship
   */
  @ManyToOne((type) => User, (user) => user.bills, { eager: false })
  user: User;
  @Column()
  userId: number;

  @OneToMany((type) => Split, (split) => split.bill, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  splits: Split[];

  /**
   * @description Time fields
   */
  @CreateDateColumn({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @BeforeInsert()
  updateWhenInsert() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  updateDateWhenUpdate() {
    this.updatedAt = new Date();
  }
}
