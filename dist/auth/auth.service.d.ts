import { CreateUserParams, UserCredentialsParams } from '../utils/types';
import { HashService } from 'src/shared/hash.service';
import { IAuthService } from './auth';
import { IUserService } from '../users/user';
import { ISessionService } from 'src/session/session';
export declare class AuthService implements IAuthService {
    private readonly sessionService;
    private readonly userService;
    private readonly crypto;
    constructor(sessionService: ISessionService, userService: IUserService, crypto: HashService);
    validateUser(params: UserCredentialsParams): Promise<any>;
    registerUser(params: CreateUserParams): Promise<any>;
}
