import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Delete, ParseArrayPipe } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { AddressIdParam } from './address-id-param';
import { AddressDto } from './address.dto';
import { AddressService } from './address.service';
import { CreateAddressDto } from './create-address.dto';

@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Get(':id')
    getById(@Param() idParam: AddressIdParam) {
        return this.addressService.getById(idParam.id);
    }

    @Post()
    create(@Body() address: CreateAddressDto) {
        return this.addressService.create(address);
    }

    @Post()
    createAddressByBatch(
    @Body(new ParseArrayPipe({ items: CreateAddressDto }))
    createAddressDtos: CreateAddressDto[],
    ) {
        // implement the create a batch of addresses
    }

    @Put(':id')
    update(@Param() idParam: AddressIdParam, @Body() address: AddressDto) {
        return this.addressService.update(idParam.id, address);
    }

    @Delete(':id')
    deleteById(@Param() idParam: AddressIdParam) {
        return this.addressService.delete(idParam.id);
    }
}
