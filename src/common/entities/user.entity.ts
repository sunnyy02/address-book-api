import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { AddressEntity } from "./address.entity";

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_name: string;

  @OneToOne(() => AddressEntity, address => address.user, {eager: true})
  @JoinColumn()
  address: AddressEntity;
}