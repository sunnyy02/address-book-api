import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUsersDto } from '../user/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/user.dto';

import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService:JwtService) {}

  async signup(userDto: CreateUsersDto) {
    const existingUser = await this.userService.getByEmail(userDto.email);
    if (existingUser) {
      throw new HttpException('User already exist', HttpStatus.FOUND);
    }
    const newUser = await this.userService.createUser(userDto);
    return newUser;
  }

  async login(user: UserDto) {
    const existingUser = await this.userService.getByEmail(user.email);
    if(!existingUser){
      throw new HttpException('Invalid credential', HttpStatus.UNAUTHORIZED);
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    console.log('password compare', user.password, existingUser.password);
    const isPasswordMatching = await bcrypt.compare(
      user.password,
      existingUser.password
    );
    if(!isPasswordMatching){
      throw new HttpException('Invalid credential', HttpStatus.UNAUTHORIZED);
    }
    const payload = { username: user.name, sub: user.id };
    return {
        access_token: this.jwtService.sign(payload),
    };
}
}
