import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
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
import { DuplicateAddressException } from './duplicate-address-exception';

@Controller('address')
@UseFilters(new HttpAddressExceptionFilter())
export class AddressController {
  private logger = new Logger('AddressController');
  constructor(private readonly addressService: AddressService) {}

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    const address = this.addressService.getById(id);
    if (!address) {
      this.logger.debug(`Address not found for id:${id}`);
      throw new NotFoundException('Address not found');
    }
    this.logger.verbose(`Address is found for id: ${id}`);
    return address;
  }

  // address?id=1
  @Get()
  search(@Query() idParam: AddressIdParam) {
    this.logger.log(
      `Address search is called with parameter: ${JSON.stringify(idParam)}`,
    );
    return this.addressService.getById(idParam.id);
  }

  @Post()
  @UsePipes(AddressValidationPipe)
  create(@Body() address: CreateAddressDto) {
    var existingAddress = this.addressService.getByAddressLine(
      address.addressLine,
    );
    if (existingAddress) {
      this.logger.warn('duplicated address');
      throw new DuplicateAddressException(address.addressLine);
    }
    const newAddress = this.addressService.create(address);
    return newAddress;
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
