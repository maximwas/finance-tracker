import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filter/all-exceptions.filter';
import { TransformResponseInterceptor } from './interceptor/transform-response.interceptor';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalInterceptors(new TransformResponseInterceptor());
  // app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT ?? 3000);

  console.log(
    `Application is running on: http://localhost:${process.env.PORT}`,
  );
}
bootstrap();
