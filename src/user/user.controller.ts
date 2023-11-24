import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUsersDto } from './create-user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDto } from './user.dto';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    return await this.userService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.getById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get(':id/object')
  async getByIdAsObject(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.getById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return {...user};
  }

  @Post()
  async create(@Body() user: CreateUsersDto) {
    return await this.userService.createUser(user);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() user: UserDto) {
    return await this.userService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.delete(id);
  }
}
