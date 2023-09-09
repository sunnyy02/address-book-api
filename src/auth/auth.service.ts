import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){}

    async validateUser(loginDto: LoginDto) {  
        const user = await this.userService.getByUserId(loginDto.userId);
        if(user == null){
            throw new NotFoundException();
        }
        if(user?.password !== loginDto.password){
            throw new UnauthorizedException();
        }
        return user;
    }
}
