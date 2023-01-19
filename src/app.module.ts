import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import * as passport from 'passport';
import IoRedis from 'ioredis';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { GatewayModule } from './gateway/gateway.module';

const RedisStore = connectRedis(session);
const redisClient = new IoRedis('redis://localhost:6379');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
          store: new RedisStore({ client: redisClient }),
          secret: 'super-secret',
          resave: false,
          saveUninitialized: false,
          cookie: {
            sameSite: true, // CORS enable
            httpOnly: false,
            maxAge: 1800000, // 30 min
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
