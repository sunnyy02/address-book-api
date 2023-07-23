import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsNumberString } from 'class-validator';

export class AddressIdParam {
  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  id: number;
}