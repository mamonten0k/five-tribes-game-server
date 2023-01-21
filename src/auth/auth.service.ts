import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IUserService } from '../users/user';

import { compareHash } from '../utils/helpers';
import { CreateUserParams, UserCredentialsParams } from '../utils/types';
import { User } from '../utils/typeorm';

import { IAuthService } from './auth';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService implements IAuthService {
  constructor(@Inject(UserService) private readonly userService: IUserService) {}

  async validateUser(params: UserCredentialsParams) {
    const credentials = await this.userService.findUser({ username: params.username });
    const isPasswordValid = await compareHash(params.password, credentials.password);

    if (!isPasswordValid) {
      throw new HttpException('Неверный логин или пароль.', HttpStatus.FORBIDDEN);
    }

    return credentials;
  }

  registerUser(params: CreateUserParams): Promise<User> {
    return this.userService.createUser(params);
  }
}
