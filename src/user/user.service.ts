import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from '../../src/auth/shared/dto/sign-up.dto';
import { UserResponse } from '../../src/shared/models/user-response.model';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './shared/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<UserResponse> {
    const salt: string = await bcrypt.genSalt();
    const { firstName, lastName, email }: SignUpDto = signUpDto;

    const user: User = this.usersRepository.create({
      firstName,
      lastName,
      email,
      salt,
      password: await UserService.hashPassword(signUpDto.password, salt),
    });
    await user.save();
    const userResponse: UserResponse = new UserResponse(user);

    return userResponse;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(data: any): Promise<User> {
    return this.usersRepository.findOne(data);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  private static async hashPassword(
    password: string,
    salt: string,
  ): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
