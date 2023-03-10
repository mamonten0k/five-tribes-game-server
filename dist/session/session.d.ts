import { CreateSessionParams, ValidateSessionParams } from '../utils/types';
export interface ISessionService {
    createSession(params: CreateSessionParams): Promise<any>;
    validateSession(params: ValidateSessionParams): Promise<any>;
}
