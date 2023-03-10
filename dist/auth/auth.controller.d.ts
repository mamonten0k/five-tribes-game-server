import { CreateUserDto } from './dtos/CreateUser.dto';
import { IAuthService } from './auth';
import { AuthorizeUserDto } from './dtos/AuthorizeUser.dto';
export declare class AuthController {
    private authService;
    constructor(authService: IAuthService);
    registerUser(createUserDto: CreateUserDto): Promise<any>;
    login(authorizeUserDto: AuthorizeUserDto): Promise<any>;
    status(): Promise<{
        session: boolean;
    }>;
}
