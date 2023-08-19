import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Delete, ParseArrayPipe, UsePipes, Query, UseFilters, NotFoundException, Logger } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { AddressIdParam } from './address-id-param';
import { HttpAddressExceptionFilter} from '../http-exception.filter';
import { AddressValidationPipe } from './address-validation.pipe';
import { AddressDto } from './address.dto';
import { AddressService } from './address.service';
import { CreateAddressDto } from './create-address.dto';
import { DuplicateAddressException } from './duplicate-address-exception';
import { CustomLogger } from '../logger/custom-logger';
import { UpdateAddressDto } from './update-address.dto';

@Controller('address')
@UseFilters(new HttpAddressExceptionFilter())
export class AddressController {
    constructor(private readonly addressService: AddressService, private customLogger: CustomLogger) {
        this.customLogger.log('AddressController initialized!');
    }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number) {
        const address = await this.addressService.getById(id);
        if(!address){
            throw new NotFoundException('Address not found');
        }
        return address;
    }

    @Get()
    async getAll() {
        return await this.addressService.getAll();
    }

    @Post()
    @UsePipes(AddressValidationPipe)
    async create(@Body() address: CreateAddressDto) {
        var existingAddress = await this.addressService.getByAddressLine(address.addressLine);
        if (existingAddress?.length > 0) {
            this.customLogger.warn('duplicated address');
            throw new DuplicateAddressException(address.addressLine);
          }
        return await this.addressService.create(address);
    }

    @Put(':id')
    async update(@Param() idParam: AddressIdParam, @Body() address: UpdateAddressDto) {
        return await this.addressService.update(idParam.id, address);
    }

    @Delete(':id')
    async deleteById(@Param() idParam: AddressIdParam) {
        return await this.addressService.delete(idParam.id);
    }
}
