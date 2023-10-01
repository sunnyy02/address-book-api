import { Controller, Get } from '@nestjs/common';
import { TransientScopeService } from './transient-scope.service';

@Controller('scope3')
export class Scope3Controller {
  constructor(private readonly transientScopeServie: TransientScopeService) {
    this.transientScopeServie.prefix = 'scope3 controller';
  }

  @Get('transient')
  transientScope() {
    this.transientScopeServie.doSomething();
  }
}
