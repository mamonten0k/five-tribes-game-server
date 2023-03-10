import { Injectable, Inject } from '@nestjs/common';

import { WSGameServerSideException } from './exceptions/ws-game.exceptions';
import {
  GetBetOptionsParams,
  GetGameDataParams,
  GetTurnsDataParams,
  HandlePlaceChipParams,
} from 'src/utils/types';

import { DatabaseGameService } from 'src/database/database.game.service';

import { IWSGameService } from './ws-game';

@Injectable()
export class WSGameService implements IWSGameService {
  constructor(@Inject(DatabaseGameService) private readonly gameAPI: DatabaseGameService) {}

  async getUpdatedProvinces(params: HandlePlaceChipParams): Promise<any> {
    const result = await this.gameAPI.getUpdatedProvinces(params);

    if (result && result.rejected) {
      throw new WSGameServerSideException(result.error_message);
    }

    return {
      provincesToUpdate: result ? result['batch-0'] : [],
    };
  }

  async getBetOptions(params: GetBetOptionsParams): Promise<any> {
    const result = await this.gameAPI.getBetOptions(params);

    if (result.rejected) {
      throw new WSGameServerSideException(result.error_message);
    }

    return {
      playersCoins: result['batch-0'],
      betOptions: result['batch-1'],
    };
  }

  async getTurnsData(params: GetTurnsDataParams): Promise<any> {
    const result = await this.gameAPI.getTurnsData(params);

    if (result.rejected) {
      throw new WSGameServerSideException(result.error_message);
    }

    if ((result as any).notification) {
      return { notificationMessage: (result as any).notification_message };
    }

    return { playersCoins: result['batch-0'], betOptions: result['batch-1'] };
  }

  async getCurrentTurnData(params: GetGameDataParams): Promise<any> {
    const result = await this.gameAPI.getCurrentTurnData(params);

    if (result.rejected) {
      throw new WSGameServerSideException(result.error_message);
    }

    if ((result as any).notification) {
      return { ...result['batch-0'][0], notificationMessage: (result as any).notification_message };
    }

    return { ...result['batch-0'][0], turnsOrder: result['batch-1'][0] };
  }

  async getGameData(params: GetGameDataParams): Promise<any> {
    const result = await this.gameAPI.getGameData(params);

    if (result.rejected) {
      throw new WSGameServerSideException(result.error_message);
    }

    return {
      ...(result['batch-0'] ? result['batch-0'][0] : []),
      ...(result['batch-1'] ? result['batch-1'][0] : []),
      turnsOrder: result['batch-2'] || [],
      playersCoins: result['batch-3'] || [],
      betOptions: result['batch-4'] || [],
      gameProvinces: result['batch-5'] || [],
      gameChips: result['batch-6'] || [],
      ownedProvinces: result['batch-7'] || [],
      ownedChips: result['batch-8'] || [],
    };
  }
}
