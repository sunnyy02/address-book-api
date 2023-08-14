import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AddressDto } from './address.dto';
import { AddressEntity } from './address.entity';
import { CreateAddressDto } from './create-address.dto';
import { UpdateAddressDto } from './update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @Inject('ADDRESS_REPOSITORY')
    private addressRepository: Repository<AddressEntity>,
  ) {}

  async getById(id: number) {
    return await this.addressRepository.findOne({
      where: {id,}
    });
  }

  async getByAddressLine(addressLine: string) {
    return await this.addressRepository.find(
      {
        where: {address_line: addressLine}
      }
    )
  }

 async create(address: CreateAddressDto) {
    const entity = new AddressEntity();
    entity.address_line = address.addressLine;
    entity.state = address.state;
    entity.post_code = address.postCode.toString();

    await this.addressRepository.save(entity);
  }

  async update(id: number, address: UpdateAddressDto) {
    const existingEntity = await this.getById(id);
    existingEntity.address_line = address.addressLine;
    existingEntity.post_code = address.postCode.toString();
    existingEntity.state = address.state;
    console.log('existing:', existingEntity);
    return this.addressRepository.save(existingEntity);
  }

  async delete(id: number) {
    return await this.addressRepository.delete(id);
  }
}
