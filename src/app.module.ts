import { CacheModule, Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import * as passport from 'passport';
import IoRedis from 'ioredis';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { GatewayModule } from './gateway/gateway.module';

const redisStore = connectRedis(session);
const redisClient = new IoRedis('redis://localhost:6379');

const client = new redisStore({ client: redisClient });

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
      store: client as any,
      url: 'redis://localhost:6379',
    }),
    HttpModule,
    UserModule,
    AuthModule,
    GatewayModule,
  ],
  providers: [Logger],
  controllers: [],
})
export class AppModule implements NestModule {
  /** Passport и Redis добавляются на этапе прероутинга,
   *  Чтобы в дальнейшем можно было писать EtE тесты.
   * */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: client,
          secret: 'super-secret',
          resave: false,
          saveUninitialized: false,
          cookie: {
            sameSite: true, // CORS
            httpOnly: false,
            maxAge: 1800000, // 30 минут
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
