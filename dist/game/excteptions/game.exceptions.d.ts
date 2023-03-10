import { HttpException } from '@nestjs/common';
export declare class GameServerSideException extends HttpException {
    constructor(error_message: string);
}
