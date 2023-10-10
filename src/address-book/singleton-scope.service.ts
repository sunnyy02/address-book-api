import { Injectable, Scope } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable({scope: Scope.DEFAULT})
export class SingletonScopeService {
  private data: string = "Data from SingletonScopeService";
  private id: string;

  constructor(){
    this.id = uuid();
    this.data = `Data from SingletonScopeService (${this.id})`;
    console.log(`SingletonScopeService initialized with id: ${this.id}`)
  }
  
  doSomething(){
    console.log(this.data);
    return this.data;
  }
}
