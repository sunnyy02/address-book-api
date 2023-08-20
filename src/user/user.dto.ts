import { IsNumberString, IsNotEmpty, IsArray } from "class-validator";
import { ContactDto } from "./contact.dto";
import { RoleDto } from "./role.dto";

export class UserDto {
    @IsNumberString()
    id: number;

    @IsNotEmpty()
    name: string;
    
    @IsNumberString()
    addressId: number;

    @IsArray()
    contacts: ContactDto[];

    @IsArray()
    roles: RoleDto[];
}