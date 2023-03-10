import { Injectable } from '@nestjs/common';
import { HttpService } from 'src/shared/http.service';

import {
  ExitGameParams,
  GetExistingGamesParams,
  GetGameDataParams,
  GetStatusInQueueParams,
  GetTurnsDataParams,
  HandleBetParams,
  HandleBetResponse,
  HandlePlaceChipParams,
  PlaceInQueueParams,
  RemoveFromQueueParams,
  Response,
} from 'src/utils/types';

@Injectable()
export class DatabaseGameService {
  constructor(private readonly httpService: HttpService) {}

  placeInQueue(params: PlaceInQueueParams): Promise<Response<any>> {
    return this.httpService.post(process.env.DATABASE_LINK, {
      params: {
        db: process.env.DATABASE_ID,
        pname: 'place_in_queue',
        p1: params.token,
      },
    });
  }

  removeFromQueue(params: RemoveFromQueueParams): Promise<Response<any>> {
    return this.httpService.post(process.env.DATABASE_LINK, {
      params: {
        db: process.env.DATABASE_ID,
        pname: 'remove_from_queue',
        p1: params.token,
      },
    });
  }

  getStatusInQueue(params: GetStatusInQueueParams): Promise<Response<any>> {
    return this.httpService.post(process.env.DATABASE_LINK, {
      params: {
        db: process.env.DATABASE_ID,
        pname: 'get_status_in_queue',
        p1: params.token,
      },
    });
  }

  getExistingGames(params: GetExistingGamesParams): Promise<Response<any>> {
    return this.httpService.postRows(process.env.DATABASE_LINK, {
      params: {
        db: process.env.DATABASE_ID,
        pname: 'get_existing_games',
        p1: params.token,
        format: 'rows',
      },
    });
  }

  exitGame(params: ExitGameParams): Promise<Response<any>> {
    return this.httpService.post(process.env.DATABASE_LINK, {
      params: {
        db: process.env.DATABASE_ID,
        pname: 'exit_game',
        p1: params.token,
        p2: params.gameId,
      },
    });
  }

  getCurrentTurnData(params: GetGameDataParams): Promise<Response<any>> {
    return this.httpService.postRows(process.env.DATABASE_LINK, {
      params: {
        db: process.env.DATABASE_ID,
        pname: 'get_current_turn_data',
        p1: params.token,
        p2: params.gameId,
        format: 'rows',
      },
    });
  }

  getGameData(params: GetGameDataParams): Promise<Response<any>> {
    return this.httpService.postRows(process.env.DATABASE_LINK, {
      params: {
        db: process.env.DATABASE_ID,
        pname: 'get_game_data',
        p1: params.token,
        p2: params.gameId,
        format: 'rows',
      },
    });
  }

  getBetOptions(params: GetGameDataParams): Promise<Response<any>> {
    return this.httpService.postRows(process.env.DATABASE_LINK, {
      params: {
        db: process.env.DATABASE_ID,
        pname: 'get_bet_options',
        p1: params.token,
        p2: params.gameId,
        format: 'rows',
      },
    });
  }

  getTurnsData(params: GetTurnsDataParams): Promise<Response<any>> {
    return this.httpService.postRows(process.env.DATABASE_LINK, {
      params: {
        db: process.env.DATABASE_ID,
        pname: 'get_turns_order',
        p1: params.token,
        p2: params.gameId,
        format: 'rows',
      },
    });
  }

  handleBet(params: HandleBetParams): Promise<Response<HandleBetResponse>> {
    return this.httpService.post(process.env.DATABASE_LINK, {
      params: {
        db: process.env.DATABASE_ID,
        pname: 'handle_bet',
        p1: params.token,
        p2: String(params.betId),
        p3: params.gameId,
      },
    });
  }

  handlePlaceChip(params: HandlePlaceChipParams): Promise<Response<any>> {
    return this.httpService.post(process.env.DATABASE_LINK, {
      params: {
        db: process.env.DATABASE_ID,
        pname: 'handle_place_chip',
        p1: params.token,
        p2: String(params.chipId),
        p3: String(params.provinceId),
        p4: params.gameId,
      },
    });
  }

  getUpdatedProvinces(params: HandlePlaceChipParams): Promise<Response<any>> {
    return this.httpService.postRows(process.env.DATABASE_LINK, {
      params: {
        db: process.env.DATABASE_ID,
        pname: 'get_updated_provinces',
        p1: params.token,
        p2: String(params.provinceId),
        p3: params.gameId,
        format: 'rows',
      },
    });
  }
}
