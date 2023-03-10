import { HttpService } from 'src/shared/http.service';
import { Token } from 'src/utils/typeorm';
import { CreateSessionParams, ValidateSessionParams, Response } from 'src/utils/types';
export declare class DatabaseSessionService {
    private readonly httpService;
    constructor(httpService: HttpService);
    createSession(params: CreateSessionParams): Promise<Response<Token>>;
    validateSession(params: ValidateSessionParams): Promise<Response<any>>;
}
