import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ErrorConstraint } from '../../src/shared/enums/error.constraint.enum';
import { UserResponse } from '../../src/shared/models/user-response.model';
import { User } from '../../src/user/shared/entities/user.entity';
import { I18nService } from 'nestjs-i18n';
import { UserService } from '../../src/user/user.service';
import { SignInDto } from './shared/dto/sign-in.dto';
import { SignUpDto } from './shared/dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../src/shared/models/jwt-payload.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
    private readonly i18n: I18nService,
  ) {}

  async signup(signUpDto: SignUpDto) {
    try {
      const user: UserResponse = await this.userService.signUp(signUpDto);
      const payload: JwtPayload = { profile: user };
      const accessToken: string = this.jwtService.sign(payload);

      return { accessToken };
    } catch (error) {
      if (error.constraint === ErrorConstraint.emailError) {
        throw new ConflictException({
          error: await this.i18n.t('en.ERRORS.AUTH.EMAIL_EXISTS', {
            lang: 'en',
          }),
        });
      }

      throw new InternalServerErrorException({
        error: await this.i18n.t('en.ERRORS.GENERAL.INTERNAL_SERVER_ERROR', {
          lang: 'en',
        }),
      });
    }
  }

  async signin(signInDto: SignInDto) {
    const user: User = await this.userService.findOne({
      email: signInDto.email,
    });

    if (!user) {
      throw new UnauthorizedException({
        error: await this.i18n.t('en.ERRORS.GENERAL.INVALID_CREDENTIALS', {
          lang: 'en',
        }),
      });
    }

    const passwordsMatches = await user.validatePassword(signInDto.password);
    if (!(user && passwordsMatches)) {
      throw new UnauthorizedException({
        error: await this.i18n.translate(
          'en.ERRORS.GENERAL.INVALID_CREDENTIALS',
          {
            lang: 'en',
          },
        ),
      });
    }

    const userResponse: UserResponse = new UserResponse(user);
    const payload: JwtPayload = { profile: userResponse };
    const accessToken: string = this.jwtService.sign(payload);

    return { accessToken };
  }

  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
}
