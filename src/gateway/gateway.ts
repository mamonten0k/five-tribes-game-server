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

  @SubscribeMessage('newSocket')
  onNewSocket(@MessageBody() body: TaggedSocketParams, @ConnectedSocket() socket: TaggedSocket) {
    socket.tag = body.token;
    this.sessions.setUserSocket(socket.tag, socket);
  }

  @SubscribeMessage('onNewGame')
  async onNewGame(@ConnectedSocket() socket: TaggedSocket) {
    try {
      const result = await this.gameService.placeInQueue({ token: socket.tag });
      // const result2 = await this.gameService.getStatusInQueue({ token: socket.tag });
      console.log(result, 'wtf');
    } catch (e) {
      console.log(e);
      socket.emit('onMessage', { msg: e.message });
    }
  }
}
