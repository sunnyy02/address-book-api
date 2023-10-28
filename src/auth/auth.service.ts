import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUsersDto } from 'src/user/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(userDto: CreateUsersDto) {
    const existingUser = await this.userService.getByEmail(userDto.email);
    if (existingUser) {
      throw new HttpException('User already exist', HttpStatus.FOUND);
    }
    const newUser = await this.userService.createUser(userDto);
    return newUser;
  }
}
