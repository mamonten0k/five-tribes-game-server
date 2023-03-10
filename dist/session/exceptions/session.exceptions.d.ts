import { HttpException } from '@nestjs/common';
export declare class SessionServerSideException extends HttpException {
    constructor(error_message: string);
}
