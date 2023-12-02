import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Expose } from 'class-transformer';
import { RoleConstant } from './role.constant';

@Entity('user')
export class UserEntity {
  // Primary key column, exposed to Admins, Editors, and Readers
  @PrimaryGeneratedColumn()
  @Expose({ groups: [RoleConstant.Admin, RoleConstant.Editor, RoleConstant.Reader] })
  id: number;

  // User name column, exposed to Admins, Editors, and Readers
  @Column()
  @Expose({ groups: [RoleConstant.Admin, RoleConstant.Editor, RoleConstant.Reader] })
  user_name: string;

  // Email column, exposed to Admins, Editors, and Readers
  @Column()
  @Expose({ groups: [RoleConstant.Admin, RoleConstant.Editor, RoleConstant.Reader] })
  email: string;

  // Pay grade column, exposed to Admins and Editors only
  @Column({ default: 'NA' })
  @Expose({ groups: [RoleConstant.Admin, RoleConstant.Editor] })
  pay_grade: string;

  // Password column, exposed to Admins only
  @Column()
  @Expose({ groups: [RoleConstant.Admin] })
  password: string;
}
