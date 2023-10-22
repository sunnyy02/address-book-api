import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/response.interceptor';
import { HttpAddressExceptionFilter } from './http-exception.filter';
import { CustomLogger } from './logger/custom-logger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log'],
    bufferLogs: true
  });
  
  app.useLogger(app.get(CustomLogger));
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Address Book API')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: false,
      disableErrorMessages: false,
      validationError: {
        value: false,
      },
      transform: true
    }),
  );
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(
  //   app.get(Reflector))
  // );
  
 // app.useGlobalFilters(new HttpAddressExceptionFilter());
 app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
