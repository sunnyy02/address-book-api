import { IsNumberString, IsNotEmpty, IsArray, IsOptional } from "class-validator";
import { ContactDto } from "./contact.dto";

export class UserDto {
    @IsNumberString()
    id: number;

    @IsNotEmpty()
    name: string;
    
    @IsNumberString()
    addressId: number;

    @IsArray()
    @IsOptional()
    contacts: ContactDto[];
}