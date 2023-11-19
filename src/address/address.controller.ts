import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AddressDto } from './address.dto';
import { AddressService } from './address.service';
import { CreateAddressDto } from './create-address.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Get()
    getAll() {
        return this.addressService.getAll();
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
