import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AddressDto } from './address.dto';
import { AddressService } from './address.service';
import { CreateAddressDto } from './create-address.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from '../common/role.decorator';
import { Role } from '../common/role.enum';

@UseGuards(JwtAuthGuard)
@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Roles(Role.Reader, Role.Writer,Role.Admin)
    @UseGuards(RoleGuard)
    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.addressService.getById(id);
    }

    @Roles(Role.Writer,Role.Admin)
    @UseGuards(RoleGuard)
    @Post()
    create(@Body() address: CreateAddressDto) {
        return this.addressService.create(address);
    }

    @Roles(Role.Writer,Role.Admin)
    @UseGuards(RoleGuard)
    @Post()
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() address: AddressDto) {
        return this.addressService.update(id, address);
    }

    @Roles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete(':id')
    deleteById(@Param('id', ParseIntPipe) id: number) {
        return this.addressService.delete(id);
    }
}
