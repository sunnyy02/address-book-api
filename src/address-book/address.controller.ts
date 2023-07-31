import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Delete, ParseArrayPipe, UsePipes, Query, UseFilters, NotFoundException } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { AddressIdParam } from './address-id-param';
import { HttpExceptionFilter } from '../http-exception.filter';
import { AddressValidationPipe } from './address-validation.pipe';
import { AddressDto } from './address.dto';
import { AddressService } from './address.service';
import { CreateAddressDto } from './create-address.dto';
import { DuplicateAddressException } from './duplicate-address-exception';

@Controller('address')
@UseFilters(new HttpExceptionFilter())
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Get(':id')
    //@UseFilters(HttpExceptionFilter)
    getById(@Param('id', ParseIntPipe) id: number) {
        const address = this.addressService.getById(id);
        if(!address){
            throw new NotFoundException('Address not found');
        }
        return address;
    }

    // address?id=1
    @Get()
    search(@Query() idParam: AddressIdParam) {
        return this.addressService.getById(idParam.id);
    }

    @Post()
    @UsePipes(AddressValidationPipe)
    create(@Body() address: CreateAddressDto) {
        var existingAddress = this.addressService.getByAddressLine(address.addressLine);
        if (existingAddress) {
            throw new DuplicateAddressException(address.addressLine);
          }
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
