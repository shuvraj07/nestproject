/* eslint-disable prettier/prettier */
import { NestFactory, } from '@nestjs/core';
import { RootModule } from './root.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exception.filter';


async function bootstrap() {

  const app = await NestFactory.create(RootModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
