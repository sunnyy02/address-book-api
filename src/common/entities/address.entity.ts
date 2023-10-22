import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({name:'address'})
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address_line: string;

  @Column()
  post_code: string;

  @Column()
  state: string;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;
}