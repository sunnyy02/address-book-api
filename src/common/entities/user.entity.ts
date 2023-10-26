import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  //Expose()
  id: number;

  @Column()
 //@Expose()
  user_name: string;

  @Column()
  //@Expose()
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;
}
