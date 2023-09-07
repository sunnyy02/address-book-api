import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { v4 as uuid} from 'uuid';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ResponseObj = context.switchToHttp().getResponse();
    ResponseObj.setHeader('Etag', uuid());
    return next.handle();
  }
}
