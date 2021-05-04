import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { config } from '../config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const port = config.PORT;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  logger.log(`Application listening on ${config.HOST}:${port}`);
}
bootstrap();
