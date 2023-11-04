import { IsNumberString, IsNotEmpty, IsArray } from "class-validator";

export class RoleDto {
    @IsNumberString()
    id: number;

    @IsNotEmpty()
    name: string;
}