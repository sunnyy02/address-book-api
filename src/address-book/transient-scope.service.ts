import { Injectable, Scope } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
@Injectable({scope: Scope.TRANSIENT})
export class TransientScopeService {
    prefix: string;
    private id: string;

    constructor(){
        this.id = uuid(); 
        console.log(`TransientScopeService initialized with id: ${this.id}`)
    }

    doSomething(){
        const data = `Request from ${this.prefix}, TransientScopeService (${this.id})`;
        console.log(data);
        return data;
    }
}
