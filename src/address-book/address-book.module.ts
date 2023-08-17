import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { LoggerModule } from '../logger/logger.module';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import {addressProvider} from './address.provider'
import { databaseProvider } from 'src/database/database.provider';
import { AddressEntity } from './address.entity';

@Module({
  imports: [DatabaseModule, LoggerModule, TypeOrmModule.forFeature([AddressEntity])],
  controllers: [AddressController],
  providers: [ AddressService],
})
export class AddressBookModule {}
