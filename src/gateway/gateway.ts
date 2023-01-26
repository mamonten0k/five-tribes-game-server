import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Server } from 'socket.io';
import { Cache } from 'cache-manager';

import { TaggedSocket } from 'src/utils/interfaces/socket';

import { GatewaySessionManager, IGatewaySessionManager } from './gateway.session';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
  },
  pingInterval: 10000,
  pingTimeout: 15000,
})
export class Gateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject(GatewaySessionManager) readonly sessions: IGatewaySessionManager,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(socket: TaggedSocket, ...args: any[]) {
    const data = await this.cacheManager.get(socket.tag);
    console.log(data, 'eat this', this.cacheManager.store.keys());
    if (data) return;
    await this.cacheManager.set(socket.tag, { res: '123' });
  }

  async handleDisconnect(socket: TaggedSocket) {
    await this.cacheManager.get(socket.tag);
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onMessage', { msg: 'emitted' });
  }

  // @SubscribeMessage('findGame')
  // onStartGame() {
  //   this.gameService.findGame({ username: '123' });
  // }
}
