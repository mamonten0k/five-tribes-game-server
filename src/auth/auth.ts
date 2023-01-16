import { User } from '../utils/typeorm/entities/User';
import { CreateUserParams, UserCredentialsParams } from '../utils/types';

export interface IAuthService {
  validateUser(params: UserCredentialsParams): Promise<User>;
  registerUser(params: CreateUserParams): Promise<User>;
}
