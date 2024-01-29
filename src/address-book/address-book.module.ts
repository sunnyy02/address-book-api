import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { AddressStoreService } from './address-store.service';

@Module({
  controllers: [AddressController],
  providers: [AddressService, AddressStoreService]
})
export class AddressBookModule {}
