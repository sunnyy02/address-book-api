import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
  ParseArrayPipe,
  UsePipes,
  Query,
  UseFilters,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { AddressIdParam } from './address-id-param';
import { HttpAddressExceptionFilter } from '../http-exception.filter';
import { AddressValidationPipe } from './address-validation.pipe';
import { AddressDto } from './address.dto';
import { AddressService } from './address.service';
import { CreateAddressDto } from './create-address.dto';
import { CustomLogger } from '../logger/custom-logger';

@Controller('address')
@UseFilters(new HttpAddressExceptionFilter())
export class AddressController {
  constructor(
    private readonly addressService: AddressService,
    private customLogger: CustomLogger,
  ) {
    this.customLogger.log('AddressController initialized!');
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    const address = this.addressService.getById(id);
    if (!address) {
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
  async create(@Body() address: CreateAddressDto) {
    return await this.addressService.create(address);
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
