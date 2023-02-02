import { Injectable } from '@nestjs/common';
import { HttpService } from 'src/shared/http.service';

import { GetStatusInQueueParams, PlaceInQueueParams, Response } from 'src/utils/types';

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

  getStatusInQueue(params: GetStatusInQueueParams): Promise<Response<any>> {
    return this.httpService.post(process.env.DATABASE_LINK, {
      params: {
        db: process.env.DATABASE_ID,
        pname: 'get_status_in_queue',
        p1: params.token,
      },
    });
  }
}
