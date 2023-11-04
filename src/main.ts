import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './common/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  /// Apply AuthGuard globally
  // app.useGlobalGuards(new AuthGuard());

  await app.listen(3000);
}
bootstrap();
