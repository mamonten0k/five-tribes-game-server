import { Module } from '@nestjs/common';
import { HttpService } from 'src/shared/http.service';
import { DatabaseSessionService } from './database.session.service';
import { DatabaseUserService } from './database.user.service';

@Module({
  providers: [HttpService, DatabaseUserService, DatabaseSessionService],
  controllers: [],
})
export class DatabaseModule {}
