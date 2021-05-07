import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto, GetUserDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { AddFriendDto } from './dto/friend.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password, email } = authCredentialsDto;

    const user = new User();

    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.email = email;
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (err) {
      if (err.code === '23505') {
        //duplicate email or username
        throw new ConflictException(err.detail);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { username, password, email } = authCredentialsDto;

    const query = this.createQueryBuilder('user');
    query
      .select('user.id', 'id')
      .addSelect(['user', 'user.salt', 'user.password'])
      .where('user.email = :email', { email });

    const tUser = await query.getOne();

    if (tUser && (await tUser.validatePassword(password))) {
      return tUser.username;
    } else {
      return null;
    }
  }
  /**
   * @description Get user by email
   * @param {GetUserDto} getUserDto
   */
  async getUserByEmail(getUserDto: GetUserDto): Promise<User> {
    const found = await this.findOne({
      where: { email: getUserDto.email },
      relations: ['friends'],
    });
    if (!found) {
      throw new NotFoundException(
        `User with Emil ${getUserDto.email} not found`,
      );
    }
    return found;
  }
  async saveToken(
    authCredentialsDto: AuthCredentialsDto,
    token: string,
  ): Promise<void> {
    const user = await this.getUserByEmail(authCredentialsDto);
    user.token = token;
    try {
      await user.save();
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async addFriend(addFriendDto: AddFriendDto, user: User): Promise<User> {
    const found = await this.getUserByEmail(addFriendDto);
    if (!user.friends) {
      user.friends = [];
    }
    user.friends.push(found);
    try {
      await user.save();
    } catch (err) {
      throw new InternalServerErrorException();
    }
    return user;
  }
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
