import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CreateContactDto } from './create-contact.dto';
import { CreateUsersDto } from './create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getByUserId(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.getByUserId(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  async getAll() {
    return  await this.userService.getAllUsers();
  }

  @Post()
  async create(@Body() user: CreateUsersDto) {
    return await this.userService.createUser(user);
  }

  @Post('contact')
  async createContact(@Body() contact: CreateContactDto) {
    return await this.userService.createUserContact(contact);
  }
}
