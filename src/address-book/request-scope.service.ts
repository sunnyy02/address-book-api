import { Injectable, Scope } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable({scope: Scope.REQUEST})
export class RequestScopeService {
    private id: string;
    constructor(){
        this.id = uuid();
        console.log(`RequestScopeService initialized with id: ${this.id}.`)
    }

    doSomething(){
        const data = `Data from RequestScopeService (${this.id})`;
        console.log(data);
        return data;
    }
}
