import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { RoleConstant } from './role.constant';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  @Expose({groups: [RoleConstant.Admin, RoleConstant.Editor, RoleConstant.Reader]})
  id: number;

  @Column()
  @Expose({groups: [RoleConstant.Admin, RoleConstant.Editor, RoleConstant.Reader]})
  user_name: string;

  @Column()
  @Expose({groups: [RoleConstant.Admin, RoleConstant.Editor, RoleConstant.Reader]})
  email: string;

  @Column({default: 'NA'})
  @Expose({groups: [RoleConstant.Admin, RoleConstant.Editor]})
  pay_grade: string;

  @Column()
  @Expose({groups: [RoleConstant.Admin]})
  password: string;
}
