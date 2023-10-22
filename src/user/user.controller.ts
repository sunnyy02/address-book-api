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
import { GROUP_DETAILS, GROUP_LIST } from '../common/entities/user.entity';
import { CreateContactDto } from './create-contact.dto';
import { CreateUsersDto } from './create-user.dto';
import { UserService } from './user.service';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({
  //strategy: 'excludeAll'
  excludePrefixes: ['_'],
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @SerializeOptions({
    groups: [GROUP_LIST],
  })
  async getAll() {
    return await this.userService.getAll();
  }

  @Get(':id')
  @SerializeOptions({
    groups: [GROUP_DETAILS],
  })
  async getById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.getById(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Post()
  async create(@Body() user: CreateUsersDto) {
    return await this.userService.createUser(user);
  }
}
