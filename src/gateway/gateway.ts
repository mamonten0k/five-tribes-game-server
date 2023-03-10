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
import {
  ExitGameParams,
  HandlePlaceChipParams,
  InititGameParams,
  TaggedSocketParams,
} from 'src/utils/types';

import { IWSGameService } from 'src/ws-game/ws-game';
import { WSGameService } from 'src/ws-game/ws-game.service';
import { HandleBetDto } from 'src/game/dtos/HandleBet.dto';

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
    @Inject(WSGameService) readonly gameService: IWSGameService,
  ) {}

  @WebSocketServer()
  server: Server;

  handleDisconnect(socket: TaggedSocket) {
    this.sessions.removeUserSocket(socket.tag);
    socket._cleanup();
    socket.disconnect();
  }

  async wsCallGameStageUpdate(params: HandleBetDto) {
    const players = this.sessions.getPlayers(params.gameId);
    const turnsData = await this.gameService.getTurnsData({ ...params });

    players.forEach((player) => player.socket.emit('onSendGameState', { ...turnsData }));
  }

  async onHandleExitGame(params: ExitGameParams) {
    const players = this.sessions.getPlayers(params.gameId);

    try {
      const data = await this.gameService.getGameData({ ...params });
      players.forEach((player) => {
        player.socket.emit('onGameEnd', { ...data });
        player.socket.disconnect();
      });
    } catch (e) {
      console.log(e);
    }
  }

  async onHandleBet(params: HandleBetDto) {
    const players = this.sessions.getPlayers(params.gameId);

    try {
      const data = await this.gameService.getGameData({ ...params });
      players.forEach((player) => player.socket.emit('onSendUpdateBetsData', { ...data }));
    } catch (e) {
      console.log(e);
    }
  }

  async onUpdateProvinces(params: HandlePlaceChipParams) {
    const players = this.sessions.getPlayers(params.gameId);
    const gameData = await this.gameService.getGameData({ ...params });

    if (gameData?.round === -1) {
      players.forEach((player) => {
        player.socket.emit('onGameEnd', { ...gameData });
        player.socket.disconnect();
      });
    }

    if (gameData.activePlayer !== params.player) {
      const data = await this.gameService.getUpdatedProvinces({ ...params });

      players.forEach((player) => player.socket.emit('onSendUpdateProvinces', { ...data }));
      players.forEach((player) =>
        player.socket.emit('onSendUpdateSecondStageData', { ...gameData }),
      );
    } else {
      const data = await this.gameService.getUpdatedProvinces({ ...params });

      players.forEach((player) => player.socket.emit('onSendUpdateProvinces', { ...data }));
    }
  }

  @SubscribeMessage('onNewSocket')
  async onNewSocket(
    @MessageBody() body: TaggedSocketParams,
    @ConnectedSocket() socket: TaggedSocket,
  ) {
    socket.tag = body.username;
    this.sessions.setUserSocket(socket.tag, body.gameId, socket);
    socket.emit('onSendSocketTagged');
  }

  @SubscribeMessage('onInitGame')
  async onInitGame(@MessageBody() body: InititGameParams, @ConnectedSocket() socket: TaggedSocket) {
    const data = await this.gameService.getGameData({ ...body });
    const rival = this.sessions.getUserSocket(data.rival);

    if (data.round === -1) {
      console.log('here', data);
      socket.emit('onGameEnd', { ...data });
      socket.disconnect();

      rival?.socket.emit('onGameEnd', { ...data });
      rival?.socket.disconnect();
    } else {
      socket.emit('onRivalConnected', { ...data });
      rival?.socket.emit('onRivalConnected', { ...data });
    }
  }
}
