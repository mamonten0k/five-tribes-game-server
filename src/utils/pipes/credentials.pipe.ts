import { BadRequestException } from '@nestjs/common';
import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserParams } from '../types';

@Injectable()
export class CredentialsValidationPipe implements PipeTransform<any> {
  async transform(params: CreateUserParams) {
    if (!params.username || params.username.length < 4) {
      throw new BadRequestException('Логин должен составлять не менее\n 4 знаков');
    }

    if (!params.password || params.password.length < 6) {
      throw new BadRequestException('Пароль должен составлять не менее\n 6 знаков');
    }

    return params;
  }
}
