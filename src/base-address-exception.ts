import { HttpException, HttpStatus } from "@nestjs/common";
import { v4 as uuid} from 'uuid';

export class BaseAddressException extends HttpException {
    public readonly errorHash: string;
    public readonly timestamp: string;

    constructor(message: string, status: HttpStatus){
        super(message, status);
        this.errorHash = uuid();
        this.timestamp = new Date().toISOString();
    }
}