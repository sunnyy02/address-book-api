import { Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const configService = new ConfigService();

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'coverage-e2e/lcov-report'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: configService.get('DATABASE_HOST'),
      port: configService.get('DATABASE_PORT'),
      username: configService.get('DATABASE_USER'),
      password: configService.get('DATABASE_PASSWORD'),
      database: configService.get('DATABASE_NAME'),
      autoLoadEntities: true,
      synchronize: configService.get('SYNCHRONIZE') === 'true',
    }),
    CommonModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure() {}
}
