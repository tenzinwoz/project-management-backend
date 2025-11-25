import { NestFactory } from '@nestjs/core';

import { ValidationPipe, VersioningType } from '@nestjs/common';
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
      whitelist: true,
      forbidNonWhitelisted: true,
      // transform: true,
    }),
  );

  // Setup Swagger documentation
  setupSwagger(app);

  // Get port from ConfigService
  const configService = app.get(ConfigService);
  const appPort = configService.get<number>('PORT') || 3000;

  await app.listen(appPort);
}
bootstrap();
