import { Optional } from "@nestjs/common";
import { IsNumberString, IsNotEmpty, IsArray, isString, IsString, IsEmail, IsOptional } from "class-validator";
import { ContactDto } from "./contact.dto";
import { RoleDto } from "./role.dto";

export class UserDto {
    @IsNumberString()
    id: number;

    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
    
    @IsNumberString()
    @IsOptional()
    addressId: number;

    @IsArray()
    @IsOptional()
    contacts: ContactDto[];

    @IsArray()
    @IsOptional()
    roles: RoleDto[];
}