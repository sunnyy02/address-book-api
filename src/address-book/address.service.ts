import { Injectable } from '@nestjs/common';
import { AddressDto } from './address.dto';
import { CreateAddressDto } from './create-address.dto';

@Injectable()
export class AddressService {
  private addressDataStore: AddressDto[] = [
    {
      id: 1,
      addressLine: '123 Queen street',
      postCode: 4000,
      state: 'QLD',
      createdDate: new Date(),
    },
  ];

  getById(id: number) {
    return this.addressDataStore.find((t) => t.id === id);
  }

  create(address: CreateAddressDto) {
    const id =
      this.addressDataStore.length === 0
        ? 0
        : Math.max(...this.addressDataStore.map((t) => t.id));
    const newAddress = { ...address, id: id + 1, createdDate: new Date() };
    this.addressDataStore.push(newAddress);
  }
  
  update(id: number, address: AddressDto): void {
    const index = this.addressDataStore.findIndex( x => x.id === id);
    this.addressDataStore[index] = address;
  }

  delete(id: number) {
    const index = this.addressDataStore.findIndex( x => x.id === id);
    this.addressDataStore.splice(index, 1);
  }
}
