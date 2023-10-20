import { Controller, Post, Body } from '@nestjs/common';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
  @Post()
  create(@Body() user: UserDto) {
    // create a user
    console.log('create a user', user);
    // return the user dto to show that is actual being received
    return user;
  }
}
