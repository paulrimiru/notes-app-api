// tslint:disable-next-line:no-var-requires
require('module-alias/register');

import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as compression from 'compression';

import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
