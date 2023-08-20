import { IsNumberString, IsNotEmpty } from "class-validator";

export class ContactDto {
    @IsNumberString()
    id: number;

    @IsNotEmpty()
    type: string;
    
    @IsNotEmpty()
    value: string;
}