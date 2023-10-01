import { Controller, Get } from '@nestjs/common';
import { RequestScopeService } from './request-scope.service';

@Controller('scope4')
export class Scope4Controller {
  constructor(private readonly requestScopeService: RequestScopeService) {}

  @Get('request')
  requestScope() {
    this.requestScopeService.doSomething();
  }
}
