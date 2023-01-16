import { User } from '../utils/typeorm/entities/User';
import { CreateUserParams, FindUserOptions, FindUserParams } from '../utils/types';

export interface IUserService {
  findUser(params: FindUserParams, options?: FindUserOptions): Promise<User | undefined>;
  createUser(params: CreateUserParams): Promise<User>;
}
