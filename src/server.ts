import { NestFactory } from '@nestjs/core';

(async () => {
  try {
    const port: number = parseInt(process.env.NODE_PORT, 10) || 5001;
  } catch (e) {
    // console.log(`Error creating microservice: ${JSON.stringify(e)}`);
  }
})();
