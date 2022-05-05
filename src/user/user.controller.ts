import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserResponse } from '../../src/shared/models/user-response.model';
import { User } from './shared/entities/user.entity';

@Controller('user')
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@Req() { user }: { user: User }) {
    const userResponse: UserResponse = new UserResponse(user);
    return userResponse;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  editUser() {
    return 'user updated';
  }
}
