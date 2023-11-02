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
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(userDto: CreateUsersDto) {
    const existingUser = await this.userService.getByEmail(userDto.email);
    if (existingUser) {
      throw new HttpException('User already exist', HttpStatus.FOUND);
    }
    const newUser = await this.userService.createUser(userDto);
    return newUser;
  }

  async login(loginDto: LoginDto) {
    const existingUser = await this.userService.getByEmail(loginDto.username);
    const passwordMatch = await bcrypt.compare(
      loginDto?.password,
      existingUser.password,
    );
    if (!existingUser || !passwordMatch) {
      throw new HttpException('Invalid credential', HttpStatus.UNAUTHORIZED);
    }
    const payload = { username: loginDto.username, sub: existingUser.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
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
