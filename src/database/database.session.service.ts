import { Injectable } from '@nestjs/common';
import { HttpService } from 'src/shared/http.service';
import { Token } from 'src/utils/typeorm';

import { CreateSessionParams, ValidateSessionParams, Response } from 'src/utils/types';

@Injectable()
export class DatabaseSessionService {
  constructor(private readonly httpService: HttpService) {}

  createSession(params: CreateSessionParams): Promise<Response<Token>> {
    return this.httpService.post(process.env.DATABASE_LINK, {
      params: {
        db: process.env.DATABASE_ID,
        pname: 'create_session',
        p1: params.username,
        p2: params.password,
      },
    });
  }

  validateSession(params: ValidateSessionParams): Promise<Response<any>> {
    return this.httpService.post(process.env.DATABASE_LINK, {
      params: {
        db: process.env.DATABASE_ID,
        pname: 'validate_session',
        p1: params.token,
      },
    });
  }
}
