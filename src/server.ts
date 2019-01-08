import { NestFactory } from '@nestjs/core';
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';

import * as express from 'express';
import { AppModule } from './app/app.module';

(async () => {
  try {
    const port: number = parseInt(process.env.NODE_PORT, 10) || 5001;
    const server = express();

    const options: NestApplicationOptions = {
      bodyParser: true,
      cors: true,
    };

    const app = await NestFactory.create(AppModule, server, options);
    await app.listenAsync(port);

    const microservice = app.connectMicroservice({});
    await microservice.listenAsync();

  } catch (e) {
   // console.log(`Error creating microservice: ${JSON.stringify(e)}`);
  }
})();
