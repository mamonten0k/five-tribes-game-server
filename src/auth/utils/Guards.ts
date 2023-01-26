import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { SessionService } from 'src/session/session.service';
import { parseBearerHeader } from 'src/utils/helpers';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(@Inject(SessionService) private sessionService: SessionService) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest();
    const token = parseBearerHeader(req);

    return await this.sessionService.validateSession({ token });
  }
}
