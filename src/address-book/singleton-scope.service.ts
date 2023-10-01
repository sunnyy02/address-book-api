import { Injectable, Scope } from '@nestjs/common';

@Injectable({scope: Scope.DEFAULT})
export class SingletonScopeService {
  constructor() {
    console.log('Singleton Scope Service initialized.');
  }
  
  doSomething(){
    console.log('singleton service do something')
  }
}
