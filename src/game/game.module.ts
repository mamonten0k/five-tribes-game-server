import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

import { GameService } from './game.service';
import { GameController } from './game.controller';
import { DatabaseGameService } from 'src/database/database.game.service';

import { AuthenticatedGuard } from 'src/auth/utils/Guards';

import { HttpService } from 'src/shared/http.service';
import { SessionService } from 'src/session/session.service';
import { DatabaseSessionService } from 'src/database/database.session.service';

@Module({
  imports: [DatabaseModule],
  controllers: [GameController],
  providers: [
    GameService,
    HttpService,
    DatabaseGameService,
    AuthenticatedGuard,
    SessionService,
    DatabaseSessionService,
  ],
  exports: [GameService],
})
export class GameModule {}
