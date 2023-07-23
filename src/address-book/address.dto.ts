import { IsDate, IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class AddressDto {
    @IsNumberString()
    id: number;
    @IsNotEmpty()
    addressLine: string;
    @IsNumberString()
    postCode: number;
    @IsString()
    state: string;
    @IsDate()
    createdDate: Date;
}