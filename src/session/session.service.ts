import { Inject, Injectable } from '@nestjs/common';

import { ISessionService } from './session';
import { SessionServerSideException } from './exceptions/session.exceptions';
import { CreateSessionParams, ValidateSessionParams } from '../utils/types';

import { DatabaseSessionService } from 'src/database/database.session.service';

@Injectable()
export class SessionService implements ISessionService {
  constructor(
    @Inject(DatabaseSessionService) private readonly sessionAPI: DatabaseSessionService,
  ) {}

  async validateSession(params: ValidateSessionParams): Promise<any> {
    const response = await this.sessionAPI.validateSession(params);

    if (response.rejected) {
      throw new SessionServerSideException(response.error_message);
    }

    return response;
  }

  async createSession(params: CreateSessionParams): Promise<any> {
    const response = await this.sessionAPI.createSession(params);

    if (response.rejected) {
      throw new SessionServerSideException(response.error_message);
    }

    return response;
  }
}
