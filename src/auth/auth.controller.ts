import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateUsersDto } from 'src/user/create-user.dto';
import { UserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')  
    @HttpCode(HttpStatus.OK)  
    public async login(@Body() loginDto: LoginDto, @Res() res) {  
      const isValid = await this.authService.validateUser(loginDto);  
      if (!isValid) {  
          return res.status(HttpStatus.NOT_FOUND).send('No user found with this user.');  
      }  

      return res.json(isValid);  
   }  


    @Post('signup')  
    @HttpCode(HttpStatus.OK)  
    public async signup(@Body() user: CreateUsersDto, @Res() res) {  
        const newUser = await this.authService.signup(user);
      return res.json(newUser);  
   }  
}
