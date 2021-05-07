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
import { classToPlain, Exclude } from 'class-transformer';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ nullable: true })
  token: string;

  @Column({ nullable: false, select: false })
  salt: string;

  @OneToMany(() => Bill, (bill) => bill.user, { eager: false })
  bills: Bill[];

  @OneToMany(() => Split, (split) => split.payer, { eager: false })
  splits: Split[];

  /**
   * @description Friendships
   */
  @ManyToMany(() => User)
  @JoinTable({
    name: 'user_friends', // table name for the junction table of this relation
    joinColumn: {
      name: 'user',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'friend',
      referencedColumnName: 'id',
    },
  })
  friends: User[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }
}
