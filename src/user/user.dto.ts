import { Optional } from "@nestjs/common";
import { IsNumberString, IsNotEmpty, IsArray, isString, IsString, IsEmail, IsOptional } from "class-validator";
import { RoleDto } from "./role.dto";

export class UserDto {
    @IsNumberString()
    id: number;

    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;
    
    @IsString()
    @IsOptional()
    password: string;

}