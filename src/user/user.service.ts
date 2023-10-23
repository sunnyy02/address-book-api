import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../common/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserDto } from './user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAll(){
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
    const userEntity = new UserEntity();
    userEntity.user_name = user.name;
    userEntity.email = user.email;
    userEntity.password = await bcrypt.hash(user.password, 10);
    userEntity.pay_grade = user.payGrade;
    
    const newUserEntity = await this.userRepository.save(userEntity);
    return {
      name: newUserEntity.user_name,
      email: newUserEntity.email,
      payGrade: newUserEntity.pay_grade,
      id: newUserEntity.id
    } as UserDto;
  }

}
