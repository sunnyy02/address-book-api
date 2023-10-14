import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'address' })
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
