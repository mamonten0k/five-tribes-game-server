import { Inject, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/Guards';

import { Routes } from '../utils/constants';
import { FindGameDto } from './dtos/FindGame.dto';
import { IGameService } from './game';
import { GameService } from './game.service';

@Controller(Routes.GAME)
export class GameController {
  constructor(@Inject(GameService) private readonly gameService: IGameService) {}

  @UseGuards(AuthenticatedGuard)
  @Post('status')
  async findGame(@Body() findGameDto: FindGameDto) {
    await this.gameService.placeInQueue(findGameDto);
    return await this.gameService.getStatusInQueue(findGameDto);
  }
}
