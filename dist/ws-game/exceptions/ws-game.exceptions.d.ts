import { HttpException } from '@nestjs/common';
export declare class WSGameServerSideException extends HttpException {
    constructor(error_message: string);
}
