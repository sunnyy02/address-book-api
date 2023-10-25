import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CacheTTL, CacheKey, CacheInterceptor } from '@nestjs/cache-manager';

@Controller('state')
@CacheKey('users')
@UseInterceptors(CacheInterceptor)
export class StateController {
  @Get()
  @CacheTTL(20000)
  getAllStates(): string[] {
    console.log(`GetAllStates called at: ${new Date().toISOString()}`);
    return ['ACT', 'QLD', 'NSW', 'SA', 'NT', 'TAS', 'VIC'];
  }
}
