import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';
import * as functions from 'firebase-functions';

const app: express.Express = express();

export const createNestServer = async (expressInstance: express.Express) => {
  const adapter = new ExpressAdapter(expressInstance);
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    adapter,
    {},
  );
  app.enableCors();
  return app.init();
};

createNestServer(app)
  .then(() => console.log('Next ready'))
  .catch((err) => console.log('Next broken', err));

export const api = functions.https.onRequest(app);
