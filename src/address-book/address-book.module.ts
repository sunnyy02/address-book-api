import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../logger/logger.module';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { AddressEntity } from '../common/entities/address.entity';
import { UserEntity } from '../common/entities/user.entity';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([AddressEntity, UserEntity])],
  controllers: [AddressController],
  providers: [ AddressService],
})
export class AddressBookModule {}
