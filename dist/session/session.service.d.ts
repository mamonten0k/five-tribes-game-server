import { ISessionService } from './session';
import { CreateSessionParams, ValidateSessionParams } from '../utils/types';
import { DatabaseSessionService } from 'src/database/database.session.service';
export declare class SessionService implements ISessionService {
    private readonly sessionAPI;
    constructor(sessionAPI: DatabaseSessionService);
    validateSession(params: ValidateSessionParams): Promise<any>;
    createSession(params: CreateSessionParams): Promise<any>;
}
