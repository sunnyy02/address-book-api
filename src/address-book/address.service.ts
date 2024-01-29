import { Injectable } from '@nestjs/common';
import { AddressDto } from './address.dto';
import { CreateAddressDto } from './create-address.dto';
import { AddressStoreService } from './address-store.service';

@Injectable()
export class AddressService {
  constructor(private readonly addressStoreService: AddressStoreService) {}

  async getById(id: number): Promise<AddressDto> {
    return await this.addressStoreService.get(id);
  }

  async getAll():Promise<AddressDto[]> {
    return await this.addressStoreService.getAll();
  }

  async create(address: CreateAddressDto) {
    await this.addressStoreService.create(address);
  }

  async update(id: number, address: AddressDto) {
    await this.addressStoreService.update(id, address);
  }

  async delete(id: number) {
    await this.addressStoreService.delete(id);
  }
}
