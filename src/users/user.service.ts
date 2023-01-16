import { Inject, Injectable } from '@nestjs/common';

import { IUserService } from './user';
import { UserFoundException, UserNotFoundException } from './exceptions/user.exceptions';

import { DatabaseUserService } from 'src/database/database.user.service';

import { User } from '../utils/typeorm/entities/User';
import { CreateUserParams, FindUserParams } from '../utils/types';

import { hash } from 'bcrypt';

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject(DatabaseUserService) private readonly userAPI: DatabaseUserService) {}

  async findUser(params: FindUserParams): Promise<User | undefined> {
    const existingUser = await this.userAPI.findOne(params);

    if (!existingUser) throw new UserNotFoundException();
    return existingUser.credentials;
  }

  async createUser(params: CreateUserParams): Promise<User | undefined> {
    const existingUser = await this.userAPI.findOne(params);

    if (existingUser) throw new UserFoundException();
    params.password = await hash(params.password, 12);

    const response = await this.userAPI.createOne(params);
    return response.credentials;
  }
}
