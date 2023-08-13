import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { LoggerModule } from '../logger/logger.module';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import {addressProvider} from './address.provider'

@Module({
  imports: [DatabaseModule, LoggerModule],
  controllers: [AddressController],
  providers: [...addressProvider, AddressService],
})
export class AddressBookModule {}
