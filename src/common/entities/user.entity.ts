import { Expose } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { AddressEntity } from './address.entity';
import { ContactEntity } from './contact.entity';
import { RoleEntity } from './role.entity';

export const GROUP_DETAILS = 'group_details';
export const GROUP_LIST = 'group_list';
@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  @Expose({groups: [GROUP_DETAILS, GROUP_LIST]})
  id: number;

  @Column()
  @Expose({groups: [GROUP_DETAILS, GROUP_LIST]})
  user_name: string;

  @OneToOne(() => AddressEntity, (address) => address.user, { eager: true })
  @JoinColumn()
  @Expose({groups: [GROUP_DETAILS]})
  address: AddressEntity;

  @OneToMany(() => ContactEntity, (contact) => contact.user, {
    eager: true,
    cascade: ['insert', 'update'],
  })
  @Expose({groups: [GROUP_DETAILS]})
  contacts: ContactEntity[];

  @ManyToMany(() => RoleEntity, (role) => role.users, {
    eager: true,
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  @Expose({groups: [GROUP_DETAILS]})
  roles: RoleEntity[];
}
