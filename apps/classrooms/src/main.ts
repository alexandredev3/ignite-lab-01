import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'classroom',
        brokers: ['localhost:29092']
      }
    }
  });

  app.startAllMicroservices().then(() => console.log('[Classrooms] Microservices is running.'));

  app.listen(3334).then(() => console.log('[Classrooms] HTTP server is running!'));
}
bootstrap();
