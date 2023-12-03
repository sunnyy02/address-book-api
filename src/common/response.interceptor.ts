import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, map, throwError } from 'rxjs';
import { convertCamel } from './convert-camel';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const reqObj = context.switchToHttp().getRequest();

    if (reqObj && reqObj.body) {
      console.log(reqObj.body, '=>', convertCamel(reqObj.body));
      reqObj.body = convertCamel(reqObj.body);

      return next.handle().pipe(
        map((res: unknown) => {
          const resObj = context.switchToHttp().getResponse();
          return {
            data: res,
            status: resObj.statusCode,
            success: true,
            error: null,
          };
        }),
      );
    }

    // If request or its body is not present, proceed without modification
    return next.handle();
  }
}
