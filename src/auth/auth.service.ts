import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUsersDto } from '../user/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/user.dto';

import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) {}

  async signup(userDto: CreateUsersDto) {
    const existingUser = await this.userService.getByEmail(userDto.email);
    if (existingUser) {
      throw new HttpException('User already exist', HttpStatus.FOUND);
    }
    const newUser = await this.userService.createUser(userDto);
    return newUser;
  }

  async validateUser(user: UserDto) {
    const existingUser = await this.userService.getByEmail(user.email);
    const passwordMatch = await bcrypt.compare(
      user?.password,
      existingUser.password,
    );
    if (!existingUser || !passwordMatch) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
