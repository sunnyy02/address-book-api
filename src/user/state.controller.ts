import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CacheTTL, CacheKey, CacheInterceptor } from '@nestjs/cache-manager';

@Controller('state')
@CacheKey('users')
@UseInterceptors(CacheInterceptor)
export class StateController {
  @Get()
  @CacheTTL(20)
  getAllStates(): string[] {
    console.log('GetAllStates called');
    return ['ACT', 'QLD', 'NSW', 'SA', 'NT', 'TAS', 'VIC'];
  }
}
