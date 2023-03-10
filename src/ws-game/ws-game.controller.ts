import { Inject, Body, Controller, Post, Delete } from '@nestjs/common';

import { WSGameService } from './ws-game.service';
import { IWSGameService } from './ws-game';

@Controller()
export class WSGameController {
  constructor(@Inject(WSGameService) private readonly gameService: IWSGameService) {}
}
