import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../common/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { StateController } from './state.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CacheModule.register()],
  controllers: [UserController, StateController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
