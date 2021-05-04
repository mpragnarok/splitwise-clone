import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import { Bill } from 'src/bills/bill.entity';
import { Split } from 'src/splits/split.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({ nullable: true })
  token: string;

  @Column()
  salt: string;

  @OneToMany(() => Bill, (bill) => bill.user, { eager: true })
  bills: Bill[];

  @OneToMany(() => Split, (split) => split.payer)
  splits: Split[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
