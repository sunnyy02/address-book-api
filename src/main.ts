import { NestFactory } from '@nestjs/core';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  // When running fastify inside a docker, we need to specify the host, which should be '0.0.0.0'
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
