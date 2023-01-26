import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { DatabaseSessionService } from 'src/database/database.session.service';
import { HashService } from 'src/shared/hash.service';
import { HttpService } from 'src/shared/http.service';

import { SessionController } from './session.controller';
import { SessionService } from './session.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SessionController],
  providers: [HttpService, HashService, DatabaseSessionService, SessionService],
  exports: [SessionService],
})
export class SessionModule {}
