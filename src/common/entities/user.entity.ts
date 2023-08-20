import { Post } from "@nestjs/common";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { AddressEntity } from "./address.entity";

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @OneToOne(() => AddressEntity, address => address.user)
  @JoinColumn()
  address: AddressEntity[];
}