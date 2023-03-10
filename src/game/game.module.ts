import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

import { GameService } from './game.service';
import { GameController } from './game.controller';
import { DatabaseGameService } from 'src/database/database.game.service';

import { AuthenticatedGuard } from 'src/auth/utils/Guards';

import { HttpService } from 'src/shared/http.service';
import { SessionService } from 'src/session/session.service';
import { DatabaseSessionService } from 'src/database/database.session.service';
import { GatewayModule } from 'src/gateway/gateway.module';
import { Gateway } from 'src/gateway/gateway';
import { WSGameModule } from 'src/ws-game/ws-game.module';
import { WSGameService } from 'src/ws-game/ws-game.service';
import { GatewaySessionManager } from 'src/gateway/gateway.session';

@Module({
  imports: [DatabaseModule, GatewayModule, forwardRef(() => WSGameModule)],
  controllers: [GameController],
  providers: [
    GameService,
    HttpService,
    DatabaseGameService,
    AuthenticatedGuard,
    SessionService,
    DatabaseSessionService,
    Gateway,
    WSGameService,
    GatewaySessionManager,
  ],
  exports: [GameService],
})
export class GameModule {}
