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
import { InititGameParams, TaggedSocketParams } from 'src/utils/types';

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
    console.log('should be around here');
    this.sessions.removeUserSocket(socket.tag);
  }

  @SubscribeMessage('onNewSocket')
  onNewSocket(@MessageBody() body: TaggedSocketParams, @ConnectedSocket() socket: TaggedSocket) {
    socket.tag = body.username;
    this.sessions.setUserSocket(socket.tag, body.gameId, socket);
    socket.emit('sendSocketTagged');
  }

  @SubscribeMessage('onInitGame')
  async onInitGame(@MessageBody() body: InititGameParams, @ConnectedSocket() socket: TaggedSocket) {
    const res = await this.gameService.getGameData({ ...body });
    const rival = this.sessions.getUserSocket(res.rival);

    if (rival && rival.gameId === body.gameId) {
      socket.emit('onRivalConnected');
      rival.socket.emit('onRivalConnected');
    }
  }
}
