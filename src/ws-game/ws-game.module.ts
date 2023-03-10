import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

import { WSGameService } from './ws-game.service';
import { WSGameController } from './ws-game.controller';
import { DatabaseGameService } from 'src/database/database.game.service';

import { HttpService } from 'src/shared/http.service';
import { SessionService } from 'src/session/session.service';
import { DatabaseSessionService } from 'src/database/database.session.service';

@Module({
  imports: [DatabaseModule],
  controllers: [WSGameController],
  providers: [
    WSGameService,
    HttpService,
    DatabaseGameService,
    SessionService,
    DatabaseSessionService,
  ],
  exports: [WSGameService],
})
export class WSGameModule {}
