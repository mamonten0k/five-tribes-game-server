import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

import { GameService } from './game.service';
import { GameController } from './game.controller';
import { DatabaseGameService } from 'src/database/database.game.service';

import { HttpService } from 'src/shared/http.service';

@Module({
  imports: [DatabaseModule],
  controllers: [GameController],
  providers: [GameService, HttpService, DatabaseGameService],
  exports: [GameService],
})
export class GameModule {}
