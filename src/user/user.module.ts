import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity } from '../common/entities/contact.entity';
import { AddressEntity } from '../common/entities/address.entity';
import { UserEntity } from '../common/entities/user.entity';
import { LoggerModule } from '../logger/logger.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([AddressEntity, UserEntity, ContactEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
