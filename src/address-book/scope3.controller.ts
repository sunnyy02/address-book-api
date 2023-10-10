import { Controller, Get } from '@nestjs/common';
import { TransientScopeService } from './transient-scope.service';

@Controller('scope3')
export class Scope3Controller {
  constructor(private readonly transientScopeServie: TransientScopeService) {
    this.transientScopeServie.prefix = 'Scope3Controller';
  }

  @Get('transient')
  transientScope() {
    return this.transientScopeServie.doSomething();
  }
}
