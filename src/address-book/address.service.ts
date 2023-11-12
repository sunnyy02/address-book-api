import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressEntity } from './address.entity';
import { CreateAddressDto } from './create-address.dto';
import { UpdateAddressDto } from './update-address.dto';
import { DuplicateAddressException } from './duplicate-address-exception';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
  ) {}

  async getById(id: number) {
    return await this.addressRepository.findOne({
      where: { id },
    });
  }

  async getByAddressLine(addressLine: string) {
    return await this.addressRepository.find({
      where: { address_line: addressLine },
    });
  }

  async create(address: CreateAddressDto) {
    const existingAddress = await this.addressRepository.findOne({
      where: { address_line: address.addressLine },
    });
    if (existingAddress) {
      throw new DuplicateAddressException(address.addressLine);
    }
    const entity = new AddressEntity();
    entity.address_line = address.addressLine;
    entity.state = address.state;
    entity.post_code = address.postCode.toString();

   return await this.addressRepository.save(entity);
  }

  async update(id: number, address: UpdateAddressDto) {
    const existingEntity = await this.getById(id);
    if (!existingEntity) {
      throw new HttpException('Incorrect address id', HttpStatus.BAD_REQUEST);
    }
    existingEntity.address_line = address.addressLine;
    existingEntity.post_code = address.postCode.toString();
    existingEntity.state = address.state;
    return this.addressRepository.save(existingEntity);
  }

  async delete(id: number) {
    return await this.addressRepository.delete(id);
  }
}
