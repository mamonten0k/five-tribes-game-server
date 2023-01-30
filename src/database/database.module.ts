import { Module } from '@nestjs/common';
import { HttpService } from 'src/shared/http.service';

import { DatabaseGameService } from './database.game.service';
import { DatabaseSessionService } from './database.session.service';
import { DatabaseUserService } from './database.user.service';

@Module({
  providers: [HttpService, DatabaseUserService, DatabaseSessionService, DatabaseGameService],
  controllers: [],
})
export class DatabaseModule {}
