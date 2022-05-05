import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../../src/shared/models/jwt-payload.model';
import { UserResponse } from '../../src/shared/models/user-response.model';
import { User } from '../../src/user/shared/entities/user.entity';
import { UserService } from '../../src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  public async validate(payload: JwtPayload): Promise<UserResponse> {
    const user: UserResponse = await this.userService.findOne(
      payload.profile.id,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
