import { Module } from '@nestjs/common';
import { AddressBookModule } from './address-book/address-book.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [AddressBookModule, LoggerModule],
})
export class AppModule {}
