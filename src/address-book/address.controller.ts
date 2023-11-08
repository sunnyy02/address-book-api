import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AddressDto } from './address.dto';
import { AddressService } from './address.service';
import { CreateAddressDto } from './create-address.dto';

// Assign the Address tag to the controller
@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get(':id')
  // Add the description to the GetById controller action.
  @ApiOperation({ summary: 'Get an address by id' })
  // Specify information about id parameter
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Address id',
    type: Number
  })
  // Defines a successful response for the GetbyId API documentation.
  @ApiOkResponse({ description: 'The Address was retrieved successfully' })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.getById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all addresses' })
  @ApiOkResponse({ description: 'Addresses were returned successfully' })
  getAll() {
    return this.addressService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create an address' })
  @ApiCreatedResponse({ description: 'Address Created Succesfully' })
  create(@Body() address: CreateAddressDto) {
    return this.addressService.create(address);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an address' })
  @ApiOkResponse({ description: 'The address was updated successfully' })
  update(@Param('id', ParseIntPipe) id: number, @Body() address: AddressDto) {
    return this.addressService.update(id, address);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an address' })
  @ApiOkResponse({ description: 'The address was deleted successfully' })
  deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.delete(id);
  }
}
