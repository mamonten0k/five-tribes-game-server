import { IoAdapter } from '@nestjs/platform-socket.io';
import { TaggedSocket } from '../utils/interfaces/socket';
import * as cookie from 'cookie';

export class WebsocketAdapter extends IoAdapter {
  createIOServer(port: number, options?: any) {
    const server = super.createIOServer(port, options);

    server.use(async (socket: TaggedSocket, next) => {
      const { cookie: clientCookie } = socket.handshake.headers;

      if (!clientCookie) return next(new Error('Not authenticated'));
      const { ['connect.sid']: sessionId } = cookie.parse(clientCookie);

      if (!sessionId) return next(new Error('No session was sent with cookie'));
      socket.tag = sessionId.slice(2, 34);

      next();
    });

    return server;
  }
}
