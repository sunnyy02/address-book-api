import { IsNumberString, IsNotEmpty, IsArray } from "class-validator";
import { ContactDto } from "./contact.dto";

export class UserDto {
    @IsNumberString()
    id: number;

    @IsNotEmpty()
    name: string;
    
    @IsNumberString()
    addressId: number;

    @IsArray()
    contacts: ContactDto[];
}