import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";
import { v4 as uuid} from 'uuid';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const errorHash = uuid();
        
        // Implement logging of the error
        response
            .status(status)
            .json({
                statusCode: status,
                message: exception.message, 
                timestamp: new Date().toISOString(),
                errorHash
            })
    }
}