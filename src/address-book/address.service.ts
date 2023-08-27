import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressDto } from './address.dto';
import { AddressEntity } from './address.entity';
import { CreateAddressDto } from './create-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
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

 async create(address: CreateAddressDto) {
    const entity = new AddressEntity();
    entity.address_line = address.addressLine;
    entity.state = address.state;
    entity.post_code = address.postCode.toString();

    await this.addressRepository.save(entity);
  }

  update(id: number, address: AddressDto): void {
    const index = this.addressDataStore.findIndex((x) => x.id === id);
    this.addressDataStore[index] = address;
  }

  delete(id: number) {
    const index = this.addressDataStore.findIndex((x) => x.id === id);
    this.addressDataStore.splice(index, 1);
  }
}
