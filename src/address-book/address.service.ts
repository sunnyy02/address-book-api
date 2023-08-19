import { Inject, Injectable } from '@nestjs/common';
import {
  InjectDataSource,
  InjectEntityManager,
  InjectRepository,
} from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { AddressDto } from './address.dto';
import { AddressEntity } from './address.entity';
import { CreateAddressDto } from './create-address.dto';
import { UpdateAddressDto } from './update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
    @InjectEntityManager()
    private entityManager: EntityManager,
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async getAll() {
    return await this.addressRepository
      .createQueryBuilder('address')
      .select(['address.address_line', 'address.post_code', 'address.state'])
      .orderBy('address.state', 'ASC')
      .addOrderBy('address.post_code', 'ASC')
      .limit(100)
      .getMany();
  }

  async getById(id: number) {
    // use repository
    const sql = this.addressRepository
                .createQueryBuilder('address')
                .where('address.id=:id', { id })
                .getSql();
    console.log('sql:', sql);
    return await this.addressRepository
      .createQueryBuilder('address')
      .where('address.id=:id', { id })
      .getOne();

    //use DataSource
    // return await this.dataSource
    //             .createQueryBuilder()
    //             .select('address')
    //             .from(AddressEntity, 'address')
    //             .where('address.id=:id', {id})
    //             .getOne();

    // use entity manager
    // return await this.entityManager.createQueryBuilder(AddressEntity, 'address')
    // .where('address.id=:id', {id})
    // .printSql()
    // .getOne();
  }

  async getByAddressLine(addressLine: string) {
    return await this.addressRepository.find({
      where: { address_line: addressLine },
    });
  }

  async create(address: CreateAddressDto) {
    return await this.addressRepository
      .createQueryBuilder()
      .insert()
      .into(AddressEntity)
      .values([
        {
          address_line: address.addressLine,
          state: address.state,
          post_code: address.postCode.toString(),
        },
      ])
      .execute();
  }

  async update(id: number, address: UpdateAddressDto) {
    return await this.addressRepository
          .createQueryBuilder()
          .update(AddressEntity)
          .set(
            {
              address_line: address.addressLine,
              post_code: address.postCode.toString(),
              state: address.state
            }
          )
          .where('id=:id', {id: address.id})
          .execute();
  }

  async delete(id: number) {
    return await this.addressRepository
                .createQueryBuilder()
                .delete()
                .from(AddressEntity)
                .where('id=:id', {id})
                .execute();
  }
}
