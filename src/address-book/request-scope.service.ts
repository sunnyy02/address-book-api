import { Injectable, Scope } from '@nestjs/common';

@Injectable({scope: Scope.REQUEST})
export class RequestScopeService {
    constructor(){
        console.log('Request Scope Service initialized.')
    }

    doSomething(){
        console.log('Request scope servie do something')
    }
}
