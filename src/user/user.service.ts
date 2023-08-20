import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../common/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './create-user.dto';
import { AddressEntity } from '../common/entities/address.entity';
import { ContactEntity } from '../common/entities/contact.entity';
import { CreateContactDto } from './create-contact.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ContactEntity)
    private contactRepository: Repository<ContactEntity>,
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
  ) {}

  async getByUserId(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['contacts'],
    });
    return user;
  }

  async createUser(user: CreateUsersDto) {
    const userEntity = new UserEntity();
    userEntity.user_name = user.name;
    if (user.addressId) {
      const address = await this.addressRepository.findOne({
        where: { id: user.addressId },
      });
      userEntity.address = address;
    }
    if (user.contacts?.length > 0) {
      userEntity.contacts = [];
      user.contacts.forEach((contact) => {
        const contactEntity = new ContactEntity();
        contactEntity.type = contact.type;
        contactEntity.value = contact.value;
        userEntity.contacts.push(contactEntity);
      });
    }
    return await this.userRepository.save(userEntity);
  }

  async createUserContact(contact: CreateContactDto) {
    const contactEntity = new ContactEntity();
    contactEntity.type = contact.type;
    contactEntity.value = contact.value;

    return await this.contactRepository.save(contactEntity);
  }
}
