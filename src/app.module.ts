/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CacheModule, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { GatewayModule } from './gateway/gateway.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    UserModule,
    SessionModule,
    AuthModule,
    GatewayModule,
  ],
  providers: [Logger],
  controllers: [],
})
export class AppModule {}
