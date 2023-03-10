import { CreateUserParams, UserCredentialsParams } from '../utils/types';
export interface IAuthService {
    validateUser(params: UserCredentialsParams): Promise<any>;
    registerUser(params: CreateUserParams): Promise<any>;
}
