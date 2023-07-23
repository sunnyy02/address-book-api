import { ApiParam, ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class AddressIdParam {
  @IsNumberString()
  @ApiProperty()
  id: number;
}