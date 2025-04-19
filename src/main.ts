import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup('api', app, () =>
    SwaggerModule.createDocument(
      app,
      { openapi: 'v1', info: { title: 'swagger', version: '1.0.0' } },
      { autoTagControllers: true },
    ),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
