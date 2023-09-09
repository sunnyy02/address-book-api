import { Optional } from "@nestjs/common";
import { IsNumberString, IsNotEmpty, IsArray, isString, IsString, IsEmail, IsOptional } from "class-validator";

export class UserDto {
    @IsNumberString()
    id: number;

    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;
    
    @IsString()
    userId: string;

    @IsString()
    password: string;
    
    @IsNumberString()
    @IsOptional()
    addressId: number;
}