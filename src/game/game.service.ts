import { Injectable, Inject } from '@nestjs/common';

import { IGameService } from './game';
import { GameServerSideException } from './excteptions/game.exceptions';
import { DatabaseGameService } from 'src/database/database.game.service';
import { GetStatusInQueueParams } from 'src/utils/types';

@Injectable()
export class GameService implements IGameService {
  games: { game_id: string };

  constructor(@Inject(DatabaseGameService) private readonly gameAPI: DatabaseGameService) {}

  async getStatusInQueue(params: GetStatusInQueueParams, retries = 20) {
    const result = await this.gameAPI.getStatusInQueue(params);
    console.log(result, retries, 'searching');
    if (result.rejected && retries === 0) throw new GameServerSideException(result.error_message);
    if (result.rejected) return setTimeout(() => this.getStatusInQueue(params, retries - 1), 5000);
    return result;
  }

  async placeInQueue(params: any) {
    const result = await this.gameAPI.placeInQueue(params);
    if (result.rejected) throw new GameServerSideException(result.error_message);
    return result;
  }

  async retrieveGameData() {
    return Promise<null>;
  }

  async updateGameStage() {
    return 0;
  }
}
