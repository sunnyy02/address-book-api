import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';

@Module({
  imports: [LoggerModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressBookModule {}
