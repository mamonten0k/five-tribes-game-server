import { PipeTransform } from '@nestjs/common';
import { CreateUserParams } from '../types';
export declare class CredentialsValidationPipe implements PipeTransform<any> {
    transform(params: CreateUserParams): Promise<CreateUserParams>;
}
