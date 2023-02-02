import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';

import { Inject } from '@nestjs/common';
import { Server } from 'socket.io';

import { TaggedSocket } from 'src/utils/interfaces/socket';

import { GatewaySessionManager, IGatewaySessionManager } from './gateway.session';
import { TaggedSocketParams } from 'src/utils/types';

import { IGameService } from 'src/game/game';
import { GameService } from 'src/game/game.service';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
  },
  pingInterval: 10000,
  pingTimeout: 15000,
})
export class Gateway implements OnGatewayDisconnect {
  constructor(
    @Inject(GatewaySessionManager) readonly sessions: IGatewaySessionManager,
    @Inject(GameService) readonly gameService: IGameService,
  ) {}

  @WebSocketServer()
  server: Server;

  handleDisconnect(socket: TaggedSocket) {
    this.sessions.removeUserSocket(socket.tag);
  }

  @SubscribeMessage('onNewSocket')
  async onNewSocket(
    @MessageBody() body: TaggedSocketParams,
    @ConnectedSocket() socket: TaggedSocket,
  ) {
    if (!this.sessions.getUserSocket(body.token)) {
      socket.tag = body.token;
      this.sessions.setUserSocket(socket.tag, socket);
    }
  }

  @SubscribeMessage('onPlaceInQueue')
  async onPlaceInQueue(@ConnectedSocket() socket: TaggedSocket) {
    try {
      const result = await this.gameService.placeInQueue({ token: socket.tag });
      socket.emit('onSendStatusInQueue', { ...result });
    } catch (e) {
      socket.emit('onSendStatusInQueue', { error_message: e.message });
    }
  }

  @SubscribeMessage('onStatusInQueue')
  async onStatusInQueue(@ConnectedSocket() socket: TaggedSocket) {
    try {
      const result = await this.gameService.getStatusInQueue({ token: socket.tag });
      socket.emit('onStatusInQueue', { data: result });
    } catch (e) {
      socket.emit('onStatusInQueue', { error_message: e.message });
    }
  }
}
