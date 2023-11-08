import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
  id: number;
  // Provide additional information of addressLine property for the API documentation
  @ApiProperty({
    type: String,
    description: 'Address line',
  })
  addressLine: string;

  @ApiProperty({
    type: String,
    description: 'Post code',
  })
  postCode: number;

  @ApiProperty({
    type: String,
    description: 'State',
  })
  state: string;

  @ApiProperty({
    type: String,
    description: 'Created date time',
  })
  createdDate: Date;
}
