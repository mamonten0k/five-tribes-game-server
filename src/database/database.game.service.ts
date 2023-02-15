import { Injectable } from '@nestjs/common';
import { HttpService } from 'src/shared/http.service';

import {
  ExitGameParams,
  GetExistingGamesParams,
  GetGameDataParams,
  GetStatusInQueueParams,
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

  getGameData(params: GetGameDataParams): Promise<Response<any>> {
    return this.httpService.post(process.env.DATABASE_LINK, {
      params: {
        db: process.env.DATABASE_ID,
        pname: 'get_game_data',
        p1: params.token,
        p2: params.gameId,
      },
    });
  }
}
