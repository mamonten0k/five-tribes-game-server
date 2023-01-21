import { Cache } from 'cache-manager';
import { CACHE_MANAGER, INestApplicationContext, Inject } from '@nestjs/common';

import { IoAdapter } from '@nestjs/platform-socket.io';
import { AuthenticatedSocket } from '../utils/interfaces';
import { Session, User } from '../utils/typeorm';
import * as cookieParser from 'cookie-parser';
import * as cookie from 'cookie';
import { plainToInstance } from 'class-transformer';

export class WebsocketAdapter extends IoAdapter {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, ...args: any[]) {
    super(...args);
  }

  createIOServer(port: number, options?: any) {
    const server = super.createIOServer(port, options);

    server.use(async (socket: AuthenticatedSocket, next) => {
      const { cookie: clientCookie } = socket.handshake.headers;

      if (!clientCookie) {
        console.log('Client has no cookies');
        return next(new Error('Not Authenticated. No cookies were sent'));
      }

      const { ['connect.sid']: sessionId } = cookie.parse(clientCookie);

      const sessionDB = await this.cacheManager.get(sessionId.slice(2, 34));
      // console.log(sessionDB, 'here');

      // if (!sessionDB) return next(new Error('No session found'));

      // const userFromJson = JSON.parse(sessionDB);

      // if (!userFromJson.passport || !userFromJson.passport.user)
      //   return next(new Error('Passport or User object does not exist.'));

      // const userDB = plainToInstance(User, JSON.parse(sessionDB).passport.user);
      // socket.user = userDB;

      next();
    });
    return server;
  }
}
