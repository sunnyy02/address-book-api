import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../common/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './create-user.dto';
import { AddressEntity } from '../common/entities/address.entity';
import { ContactEntity } from '../common/entities/contact.entity';
import { CreateContactDto } from './create-contact.dto';
import { RoleEntity } from 'src/common/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ContactEntity)
    private contactRepository: Repository<ContactEntity>,
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
    @InjectRepository(AddressEntity)
    private addressRepository: Repository<AddressEntity>,
  ) {}

  async getAll(){
    return await this.userRepository.find();
  }

  async getById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['contacts'],
    });
  }

  async getByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async createUser(user: CreateUsersDto) {
    const userEntity = new UserEntity();
    userEntity.user_name = user.name;
    userEntity.email = user.email;
    userEntity.password = user.password;
    
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
    if (user.roles?.length > 0) {
      userEntity.roles = [];
      await Promise.all(
        user.roles.map(async (role) => {
          const roleEntity = await this.addOrGetRole(role.name);
          userEntity.roles.push(roleEntity);
        }),
      );
    }
    return await this.userRepository.save(userEntity);
  }

  async createUserContact(contact: CreateContactDto) {
    const contactEntity = new ContactEntity();
    contactEntity.type = contact.type;
    contactEntity.value = contact.value;

    return await this.contactRepository.save(contactEntity);
  }

  private async addOrGetRole(roleName: string) {
    const roleEntity = await this.roleRepository.findOne({
      where: { name: roleName },
    });
    if (!roleEntity) {
      const newRole = new RoleEntity();
      newRole.name = roleName;
      return newRole;
    }
    return roleEntity;
  }
}
