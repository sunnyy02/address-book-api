import { Expose } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

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

  @Column()
  email: string;

  @Column()
  password: string;
}
