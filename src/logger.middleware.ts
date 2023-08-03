import { Injectable, NestMiddleware, RequestMethod } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLogger } from './logger/custom-logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: CustomLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`req: {
      headers: ${JSON.stringify(req.headers)},
      body: ${JSON.stringify(req.body)},
      originalUrl: ${req.originalUrl},
    }`);

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');

      this.logger.log(
        `response:${req.url} status code:${res.statusCode} length:${contentLength}`,
      );
    });
    if (next) {
      next();
    }
  }
}
