import { Inject, Injectable } from '@nestjs/common';
import { UserServerSideException } from './exceptions/user.exceptions';

import { IUserService } from './user';
import { DatabaseUserService } from 'src/database/database.user.service';

import { CreateUserParams } from '../utils/types';

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject(DatabaseUserService) private readonly userAPI: DatabaseUserService) {}

  async createUser(params: CreateUserParams): Promise<any> {
    const response = await this.userAPI.createOne(params);
    if (response.rejected) throw new UserServerSideException(response.error_message);
    return response;
  }
}
