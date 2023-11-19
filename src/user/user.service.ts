import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../common/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './create-user.dto';
import { UserDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAll() {
    return await this.userRepository.find();
  }

  async getById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async getByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async createUser(user: CreateUsersDto) {

    const existinguser = await this.getByEmail(user.email);
    if (!!existinguser) {
      throw new HttpException('The email is already be used', HttpStatus.CONFLICT);
    }
    const userEntity = new UserEntity();
    userEntity.user_name = user.name;
    userEntity.email = user.email;
    userEntity.password = await bcrypt.hash(user.password, 10);

    const newUserEntity = await this.userRepository.save(userEntity);
    return {
      name: newUserEntity.user_name,
      email: newUserEntity.email,
      id: newUserEntity.id,
    } as UserDto;
  }
}
