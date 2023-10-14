import { Module } from '@nestjs/common';
import { AddressBookModule } from './address-book/address-book.module';

@Module({
  imports: [AddressBookModule],
})
export class AppModule {}
