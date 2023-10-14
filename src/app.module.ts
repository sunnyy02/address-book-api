import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AddressBookModule } from './address-book/address-book.module';
import { LoggerModule } from './logger/logger.module';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [AddressBookModule, LoggerModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
