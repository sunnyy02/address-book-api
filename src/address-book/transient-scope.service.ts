import { Injectable, Scope } from '@nestjs/common';

@Injectable({scope: Scope.TRANSIENT})
export class TransientScopeService {
    prefix: string;

    constructor(){
        console.log('Transient Scope Service initialized.')
    }

    doSomething(){
        console.log(`from ${this.prefix} - do something`)
    }
}
