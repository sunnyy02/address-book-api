import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
@Controller('state')
@UseInterceptors(CacheInterceptor)
export class StateController {
  @Get()
  getAllStates(): string[] {
    console.log('GetAllStates called');
    return ['ACT', 'QLD', 'NSW', 'SA', 'NT', 'TAS', 'VIC'];
  }
}
