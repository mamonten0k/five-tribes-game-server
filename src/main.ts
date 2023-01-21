import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { WebsocketAdapter } from './gateway/gateway.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ credentials: true, origin: true });

  const adapter = new WebsocketAdapter(null, app);
  app.useWebSocketAdapter(adapter);

  await app.listen(9001);
}

bootstrap();
