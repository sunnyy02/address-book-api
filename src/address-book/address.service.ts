import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressDto } from './address.dto';
import { AddressEntity } from './address.entity';
import { CreateAddressDto } from './create-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @Inject('ADDRESS_REPOSITORY')
    private addressRepository: Repository<AddressEntity>,
  ) {}

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

  getByAddressLine(addressLine: string) {
    return this.addressDataStore.find((t) => t.addressLine === addressLine);
  }

  create(address: CreateAddressDto) {
    const id =
      this.addressDataStore.length === 0
        ? 0
        : Math.max(...this.addressDataStore.map((t) => t.id));
    const newAddress = { ...address, id: id + 1, createdDate: new Date() };
    //this.addressDataStore.push(newAddress);
    const entity = new AddressEntity();
    entity.address_line = address.addressLine;
    entity.state = address.state;
    entity.post_code = address.postCode.toString();
    
    this.addressRepository.save(entity);
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
