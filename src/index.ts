import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';
import { AppModule } from './app.module';

const expressServer = express();

// Move the initialization of NestJS outside of the request handler
let nestApp: any;
const createNestApp = async (expressInstance): Promise<void> => {
  nestApp = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  await nestApp.init();
};

// Ensure that NestJS initializes as soon as this file is loaded
createNestApp(expressServer);

export const api = functions.https.onRequest((request, response) => {
  expressServer(request, response);
});
