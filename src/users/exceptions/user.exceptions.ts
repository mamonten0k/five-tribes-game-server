import { HttpException, HttpStatus } from '@nestjs/common';

export class UserFoundException extends HttpException {
  constructor() {
    super('User already exists', HttpStatus.CONFLICT);
  }
}

export class UserNotFoundException extends HttpException {
  constructor() {
    super('User not found', HttpStatus.BAD_REQUEST);
  }
}
