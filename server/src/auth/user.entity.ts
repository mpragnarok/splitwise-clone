import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import { Bill } from 'src/bills/bill.entity';

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

  @OneToMany((type) => Bill, (bill) => bill.user, { eager: true })
  bills: Bill[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
