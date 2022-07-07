import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

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

export const onCreatePet = functions.firestore
  .document('pets/{petId}')
  .onCreate(async (snapshot, context) => {
    const petId = snapshot.id;
    const petName = snapshot.data()['name'];
    await admin.firestore().collection('orderPets').add({
      id: petId,
      name: petName,
      created: true,
    });
  });
