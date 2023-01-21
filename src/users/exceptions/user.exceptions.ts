import { HttpException, HttpStatus } from '@nestjs/common';

export class UserFoundException extends HttpException {
  constructor() {
    super('Пользователь с таким логином уже зарегистрирован', HttpStatus.CONFLICT);
  }
}

export class UserNotFoundException extends HttpException {
  constructor() {
    super('Пользователь не найден', HttpStatus.BAD_REQUEST);
  }
}
