import { Injectable } from '@nestjs/common';
import { HttpService } from 'src/shared/http.service';
import { Token } from 'src/utils/typeorm';

import { CreateUserParams, FindUserResponse, FindUserParams, Response } from 'src/utils/types';

@Injectable()
export class DatabaseUserService {
  constructor(private readonly httpService: HttpService) {}

  findOne(params: FindUserParams): Promise<FindUserResponse> {
    return this.httpService.post(process.env.DATABASE_LINK, {
      params: {
        db: process.env.DATABASE_ID,
        pname: 'retrieve_user',
        p1: params.username,
      },
    });
  }

  createOne(params: CreateUserParams): Promise<Response<Token>> {
    return this.httpService.post(process.env.DATABASE_LINK, {
      params: {
        db: process.env.DATABASE_ID,
        pname: 'sign_up',
        p1: params.username,
        p2: params.password,
      },
    });
  }
}
