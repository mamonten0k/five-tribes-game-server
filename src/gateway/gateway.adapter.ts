import { IoAdapter } from '@nestjs/platform-socket.io';
import { TaggedSocket } from '../utils/interfaces/socket';
import * as cookie from 'cookie';

export class WebsocketAdapter extends IoAdapter {
  createIOServer(port: number, options?: any) {
    const server = super.createIOServer(port, options);

    return server;
  }
}
