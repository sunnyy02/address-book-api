import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressBookModule } from './address-book/address-book.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [AddressBookModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
