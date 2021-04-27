import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'splitSecret',
    });
  }

  async validate(payload: JwtPayload) {
    const { username, email } = payload;
    const user = await this.userRepository.findOne({ email, username });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
