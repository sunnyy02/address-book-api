import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../common/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { StateController } from './state.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { RoleEntity } from 'src/common/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    CacheModule.register({
      ttl: 5000, // ms
      max: 100, // maximum number of items in cache
    }),
  ],
  controllers: [UserController, StateController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
