import { CreateUserParams } from '../utils/types';

export interface IUserService {
  createUser(params: CreateUserParams): Promise<any>;
}
