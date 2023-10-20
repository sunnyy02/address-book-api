import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  password: string;
}
