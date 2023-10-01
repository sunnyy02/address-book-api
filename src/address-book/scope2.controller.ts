import { Controller, Get } from '@nestjs/common';
import { TransientScopeService } from './transient-scope.service';

@Controller('scope2')
export class Scope2Controller {
  constructor(
    private readonly transientScopeServie: TransientScopeService,
  ) {
    this.transientScopeServie.prefix = 'scope2 controller';
  }

  @Get('transient')
  transientScope() {
    this.transientScopeServie.doSomething();
  }
}
