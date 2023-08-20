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

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_name: string;

  @OneToOne(() => AddressEntity, (address) => address.user, { eager: true })
  @JoinColumn()
  address: AddressEntity;

  @OneToMany(() => ContactEntity, (contact) => contact.user, {
    cascade: ['insert', 'update'],
  })
  contacts: ContactEntity[];

  @ManyToMany(() => RoleEntity, role => role.users,  {
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  roles: RoleEntity[];
}
