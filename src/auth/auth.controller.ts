import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsersDto } from 'src/user/create-user.dto';
import { UserDto } from 'src/user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  public async signup(@Body() user: CreateUsersDto, @Res() res) {
    const newUser = await this.authService.signup(user);
    return res.json(newUser);
  }

  @Post('login')
  async login(@Body() user: UserDto) {
      return this.authService.login(user);
  }
}
