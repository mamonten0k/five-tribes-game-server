import { Module } from '@nestjs/common';
import { HttpService } from 'src/shared/http.service';
import { DatabaseUserService } from './database.user.service';

@Module({
  providers: [HttpService, DatabaseUserService],
  controllers: [],
})
export class DatabaseModule {}
