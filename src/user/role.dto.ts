import { IsNumberString, IsNotEmpty, IsArray, IsOptional } from "class-validator";

export class RoleDto {
    @IsNumberString()
    @IsOptional()
    id: number;

    @IsNotEmpty()
    name: string;
}