import { IsNumberString, IsNotEmpty } from "class-validator";

export class UserDto {
    @IsNumberString()
    id: number;

    @IsNotEmpty()
    name: string;
    
    @IsNumberString()
    addressId: number;
}