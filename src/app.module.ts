import { Module } from '@nestjs/common';
import { AddressBookModule } from './address-book/address-book.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [AddressBookModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
