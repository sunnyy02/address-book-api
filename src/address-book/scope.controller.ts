import { Controller, Get } from '@nestjs/common';
import { SingletonScopeService } from './singleton-scope.service';

@Controller('scope')
export class ScopeController {
  constructor(private readonly singletonService: SingletonScopeService) {}
  
  @Get('singleton')
  singleton() {
    return this.singletonService.doSomething();
  }
}
