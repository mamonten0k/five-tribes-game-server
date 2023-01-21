import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';

import { Inject, OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';

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
export class Gateway implements OnModuleInit {
  // constructor(@Inject(GameService) private gameService: IGameService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
    });
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
