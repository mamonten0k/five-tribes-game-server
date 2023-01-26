import { Injectable, Inject } from '@nestjs/common';
import { CreateUserParams, UserCredentialsParams } from '../utils/types';

import { HashService } from 'src/shared/hash.service';
import { IAuthService } from './auth';

import { UserService } from 'src/users/user.service';
import { IUserService } from '../users/user';

import { SessionService } from 'src/session/session.service';
import { ISessionService } from 'src/session/session';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(SessionService) private readonly sessionService: ISessionService,
    @Inject(UserService) private readonly userService: IUserService,
    @Inject(HashService) private readonly crypto: HashService,
  ) {}

  async validateUser(params: UserCredentialsParams) {
    params.password = this.crypto.hash(params.password);
    const response = await this.sessionService.createSession(params);

    return response;
  }

  async registerUser(params: CreateUserParams) {
    params.password = this.crypto.hash(params.password);
    const response = await this.userService.createUser(params);

    return response;
  }
}
