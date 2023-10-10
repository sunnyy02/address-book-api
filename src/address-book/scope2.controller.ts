import { Controller, Get } from '@nestjs/common';
import { TransientScopeService } from './transient-scope.service';

@Controller('scope2')
export class Scope2Controller {
  constructor(
    private readonly transientScopeServie: TransientScopeService,
  ) {
    this.transientScopeServie.prefix = 'Scope2Controller';
  }

  @Get('transient')
  transientScope() {
    return this.transientScopeServie.doSomething();
  }
}
