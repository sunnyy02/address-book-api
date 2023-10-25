import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, catchError, map, throwError } from 'rxjs';
import { v4 as uuid} from 'uuid';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    return next.handle().pipe(
      map((res: unknown) => {
        const resObj = context.switchToHttp().getResponse();
        resObj.setHeader('Etag', uuid());
        return {
          data: res,
          status: resObj.statusCode,
          success: true,
          error: null
        }
      })
    );
  }
}
