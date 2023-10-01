import { Module } from '@nestjs/common';
import { ScopeController } from './scope.controller';
import { SingletonScopeService } from './singleton-scope.service';
import { RequestScopeService } from './request-scope.service';
import { TransientScopeService } from './transient-scope.service';
import { Scope2Controller } from './scope2.controller';
import { Scope3Controller } from './scope3.controller';
import { Scope4Controller } from './scope4.controller';

@Module({
  controllers: [ScopeController, Scope2Controller, Scope3Controller, Scope4Controller],
  providers: [SingletonScopeService, RequestScopeService, TransientScopeService],
})
export class AddressBookModule {}
