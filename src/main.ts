import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { setupSwagger } from 'src/shared/swagger/swagger-setup';

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

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
