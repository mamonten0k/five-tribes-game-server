import { HttpException } from '@nestjs/common';
export declare class UserServerSideException extends HttpException {
    constructor(error_message: string);
}
