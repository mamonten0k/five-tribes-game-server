import { Injectable, Inject } from '@nestjs/common';

import { GameServerSideException } from './excteptions/game.exceptions';
import {
  ExitGameParams,
  GetGameDataParams,
  GetStatusInQueueParams,
  WithTokenParams,
} from 'src/utils/types';

import { DatabaseGameService } from 'src/database/database.game.service';

import { IGameService } from './game';
import { waitFor } from 'src/utils/helpers';

@Injectable()
export class GameService implements IGameService {
  constructor(@Inject(DatabaseGameService) private readonly gameAPI: DatabaseGameService) {}

  async exitGame(params: ExitGameParams): Promise<any> {
    const result = await this.gameAPI.exitGame(params);

    if (result.rejected) {
      throw new GameServerSideException(result.error_message);
    }

    return result;
  }

  async getExistingGames(params: WithTokenParams): Promise<any> {
    const result = await this.gameAPI.getExistingGames(params);

    if (result.rejected) {
      throw new GameServerSideException(result.error_message);
    }

    return { games: result['batch-0'] };
  }

  async getGameData(params: GetGameDataParams): Promise<any> {
    const result = await this.gameAPI.getGameData(params);

    if (result.rejected) {
      throw new GameServerSideException(result.error_message);
    }

    return result;
  }

  async getStatusInQueue(params: GetStatusInQueueParams, retries = 3) {
    const result = await this.gameAPI.getStatusInQueue(params);

    if (result.rejected && retries === 0) {
      await this.gameAPI.removeFromQueue(params);
      throw new GameServerSideException(result.error_message);
    }

    if (result.rejected) {
      await waitFor(5000);
      return this.getStatusInQueue(params, retries - 1);
    }

    return result;
  }

  async placeInQueue(params: any) {
    const result = await this.gameAPI.placeInQueue(params);

    if (result.rejected) {
      throw new GameServerSideException(result.error_message);
    }

    return result;
  }

  async retrieveGameData() {
    return Promise<null>;
  }

  async updateGameStage() {
    return 0;
  }
}
