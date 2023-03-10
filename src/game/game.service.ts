import { Injectable, Inject } from '@nestjs/common';

import { GameServerSideException } from './excteptions/game.exceptions';
import {
  ExitGameParams,
  GetBetOptionsParams,
  GetStatusInQueueParams,
  HandlePlaceChipParams,
  WithTokenParams,
} from 'src/utils/types';

import { Gateway } from 'src/gateway/gateway';
import { DatabaseGameService } from 'src/database/database.game.service';

import { IGameService } from './game';
import { waitFor } from 'src/utils/helpers';
import { HandleBetDto } from './dtos/HandleBet.dto';

@Injectable()
export class GameService implements IGameService {
  constructor(
    @Inject(DatabaseGameService) private readonly gameAPI: DatabaseGameService,
    @Inject(Gateway) private readonly gateway: Gateway,
  ) {}
  async handlePlaceChip(params: HandlePlaceChipParams): Promise<any> {
    const result = await this.gameAPI.handlePlaceChip(params);

    if (result.rejected) {
      throw new GameServerSideException(result.error_message);
    }

    this.gateway.onUpdateProvinces(params);
    return result;
  }

  async exitGame(params: ExitGameParams): Promise<any> {
    const result = await this.gameAPI.exitGame(params);

    if (result.rejected) {
      throw new GameServerSideException(result.error_message);
    }

    this.gateway.onHandleExitGame(params);
    return result;
  }

  async hanleBet(params: HandleBetDto): Promise<any> {
    const result = await this.gameAPI.handleBet(params);

    if (result.rejected) {
      throw new GameServerSideException(result.error_message);
    }

    this.gateway.onHandleBet(params);
  }

  async getExistingGames(params: WithTokenParams): Promise<any> {
    const result = await this.gameAPI.getExistingGames(params);

    if (result.rejected) {
      throw new GameServerSideException(result.error_message);
    }

    return { games: result['batch-0'] };
  }

  async getBetOptions(params: GetBetOptionsParams): Promise<any> {
    const result = await this.gameAPI.getBetOptions(params);

    if (result.rejected) {
      throw new GameServerSideException(result.error_message);
    }

    return { playersCoins: result['batch-0'], betOptions: result['batch-1'] };
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
}
