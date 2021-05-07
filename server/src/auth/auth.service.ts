import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AddFriendDto } from './dto/friend.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );
    const { email } = authCredentialsDto;
    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email, username };
    const accessToken = await this.jwtService.sign(payload);
    await this.userRepository.saveToken(authCredentialsDto, accessToken);
    this.logger.debug(
      `Generated JWT Token with payload ${JSON.stringify(payload)}`,
    );
    return { accessToken };
  }

  async addFriend(addFriendDto: AddFriendDto, user: User): Promise<User> {
    return this.userRepository.addFriend(addFriendDto, user);
  }
}
