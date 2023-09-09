import { IsNumberString, IsNotEmpty, IsArray, isString, IsString } from "class-validator";
import { ContactDto } from "./contact.dto";
import { RoleDto } from "./role.dto";

export class UserDto {
    @IsNumberString()
    id: number;

    @IsNotEmpty()
    name: string;

    @IsString()
    userId: string;

    @IsString()
    password: string;
    
    @IsNumberString()
    addressId: number;

    @IsArray()
    contacts: ContactDto[];

    @IsArray()
    roles: RoleDto[];
}