import { CanActivate, ExecutionContext } from '@nestjs/common';
import { SessionService } from 'src/session/session.service';
export declare class AuthenticatedGuard implements CanActivate {
    private sessionService;
    constructor(sessionService: SessionService);
    canActivate(context: ExecutionContext): Promise<any>;
}
