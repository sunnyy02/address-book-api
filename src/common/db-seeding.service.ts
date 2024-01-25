import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { TestData } from './test-data';

@Injectable()
export class DBSeedingService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async seedUsers() {


    await Promise.all(
      TestData.allUsers.map((user) => this.userRepository.save(user)),
    );
  }

  async cleanUsers() {
    const existingUsers = await this.userRepository.find();
    if (!existingUsers) {
      return null;
    }
    return await this.userRepository.remove(existingUsers);
  }
}
