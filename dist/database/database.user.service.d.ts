import { HttpService } from 'src/shared/http.service';
import { Token } from 'src/utils/typeorm';
import { CreateUserParams, FindUserResponse, FindUserParams, Response } from 'src/utils/types';
export declare class DatabaseUserService {
    private readonly httpService;
    constructor(httpService: HttpService);
    findOne(params: FindUserParams): Promise<FindUserResponse>;
    createOne(params: CreateUserParams): Promise<Response<Token>>;
}
