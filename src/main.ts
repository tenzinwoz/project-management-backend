import { NestFactory, Reflector } from '@nestjs/core';

import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { setupSwagger } from 'src/shared/swagger/swagger-setup';
import { AppModule } from 'src/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable URI versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Set global prefix for all routes
  app.setGlobalPrefix('api');

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // it strips unknown fields from the DTO
      forbidNonWhitelisted: true, // it throws an error if unknown fields are sent.
      transform: true, // it transforms payloads to be objects typed according to their DTO classes
    }),
  );

  // Enable global serialization interceptor
  app.useGlobalInterceptors(new ClassSerializerInterceptor(new Reflector()));

  // Setup Swagger documentation
  setupSwagger(app);

  // Get port from ConfigService
  const configService = app.get(ConfigService);
  const appPort = configService.get<number>('PORT') || 3000;

  await app.listen(appPort);
}
bootstrap();
