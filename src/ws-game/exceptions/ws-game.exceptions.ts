import { HttpException, HttpStatus } from '@nestjs/common';

export class WSGameServerSideException extends HttpException {
  constructor(error_message: string) {
    super(error_message, HttpStatus.BAD_REQUEST);
  }
}
