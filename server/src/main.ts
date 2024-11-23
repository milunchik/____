import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { secret } from '../config/secret';
const session = require('express-session');
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://veil-q3heeeujs-hremilys-projects.vercel.app'
        : 'http://localhost:9000',
    credentials: true,
  });

  app.use(
    session({
      secret: process.env.SESSION_SECRET || secret,
      resave: false,
      saveUninitialized: false,
      cookie: { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 },
      // cookie: { secure: process.env.NODE_ENV === 'production' }
    }),
  );

  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
