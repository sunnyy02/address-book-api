import { IsNumberString, IsNotEmpty, IsArray } from "class-validator";
import { ContactDto } from "./contact.dto";

export class RoleDto {
    @IsNumberString()
    id: number;

    @IsNotEmpty()
    name: string;
}