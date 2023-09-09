import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUsersDto } from 'src/user/create-user.dto';
import { UserDto } from '../user/user.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){}

    async validateUser(loginDto: LoginDto) {  
        const user = await this.userService.getByEmail(loginDto.email);
        if(user == null){
            throw new NotFoundException();
        }
        if(user?.password !== loginDto.password){
            throw new UnauthorizedException();
        }
        return !!user;
    }

    async signup(userDto: CreateUsersDto){
        const existingUser = await this.userService.getByEmail(userDto.email);
        if(existingUser){
            throw new HttpException('User already exist', HttpStatus.FOUND);
        }
        const newUser = await this.userService.createUser(userDto);
        return newUser;
    }
}
