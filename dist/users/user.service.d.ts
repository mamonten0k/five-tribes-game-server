import { IUserService } from './user';
import { DatabaseUserService } from 'src/database/database.user.service';
import { CreateUserParams } from '../utils/types';
export declare class UserService implements IUserService {
    private readonly userAPI;
    constructor(userAPI: DatabaseUserService);
    createUser(params: CreateUserParams): Promise<any>;
}
