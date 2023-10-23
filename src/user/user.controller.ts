import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUsersDto } from './create-user.dto';
import { UserService } from './user.service';
import { RoleConstant } from 'src/common/entities/role.constant';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    return await this.userService.getAll();
  }

  @Get('admin/:id')
  @SerializeOptions({
    groups: [RoleConstant.Admin],
  })
  async getByAdmin(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getById(id);
  }


  @Get('editor/:id')
  @SerializeOptions({
    groups: [RoleConstant.Editor],
  })
  async getByEditor(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getById(id);
  }

  @Get('reader/:id')
  @SerializeOptions({
    groups: [RoleConstant.Reader],
  })
  async getByReader(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getById(id);
  }

  @Post()
  async create(@Body() user: CreateUsersDto) {
    return await this.userService.createUser(user);
  }
}
