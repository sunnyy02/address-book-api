import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { UserController } from './user.controller';

@Module({
  controllers: [AddressController, UserController],
  providers: [AddressService]
})
export class AddressBookModule {}
