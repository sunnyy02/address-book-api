import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class DBSeedingService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async seedUsers() {
    const usersToSeed = [
      {id: 1, user_name: 'user1', email: 'user1@example.com', password: 'password' },
      {id: 2, user_name: 'user2', email: 'user2@example.com', password: 'password' },
    ];

    await Promise.all(
      usersToSeed.map((user) => this.userRepository.save(user)),
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
