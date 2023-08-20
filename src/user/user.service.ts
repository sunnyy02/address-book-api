import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../common/entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { CreateUsersDto } from './create-user.dto';
import { AddressEntity } from 'src/common/entities/address.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
  ) {}

  async getByUserId(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['address'],
    });
    console.log('user:', user);
    return user;
  }

  async createUser(user: CreateUsersDto){
    const userEntity = new UserEntity();
    userEntity.user_name = user.name;
    if(user.addressId) {
        const address = await this.addressRepository.findOne({
            where: {id: user.addressId}
        });
        userEntity.address = address;
    }
    return await this.userRepository.save(userEntity);
  }
}
