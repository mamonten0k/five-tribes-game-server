/* eslint-disable @typescript-eslint/ban-types */
import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { IUserService } from 'src/users/user';
import { UserService } from 'src/users/user.service';

import { User } from 'src/utils/typeorm';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(@Inject(UserService) private readonly userService: IUserService) {
    super();
  }

  serializeUser(user: User, done: Function) {
    done(null, user);
  }

  async deserializeUser(user: User, done: Function) {
    const userFound = await this.userService.findUser({ username: user.username });
    return userFound ? done(null, userFound) : done(null, null);
  }
}
