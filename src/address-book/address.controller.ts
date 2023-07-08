import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Delete } from '@nestjs/common';
import { AddressDto } from './address.dto';
import { AddressService } from './address.service';
import { CreateAddressDto } from './create-address.dto';

@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.addressService.getById(id);
    }

    @Post()
    create(@Body() address: CreateAddressDto) {
        return this.addressService.create(address);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() address: AddressDto) {
        return this.addressService.update(id, address);
    }

    @Delete(':id')
    deleteById(@Param('id', ParseIntPipe) id: number) {
        return this.addressService.delete(id);
    }
}
