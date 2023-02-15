import { Inject, Body, Controller, Post, Delete, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/Guards';
import { Routes } from '../utils/constants';

import { FindGameDto } from './dtos/FindGame.dto';
import { FindGamesDto } from './dtos/FindGames.dto';

import { GameService } from './game.service';
import { IGameService } from './game';
import { ExitGameDto } from './dtos/ExitGame.dto';

@UseGuards(AuthenticatedGuard)
@Controller(Routes.GAME)
export class GameController {
  constructor(@Inject(GameService) private readonly gameService: IGameService) {}

  @Post('game-status')
  async findGame(@Body() findGameDto: FindGameDto) {
    await this.gameService.placeInQueue(findGameDto);
    return await this.gameService.getStatusInQueue(findGameDto);
  }

  @Post('existing-games')
  async findExistingGames(@Body() findGameDto: FindGamesDto) {
    return await this.gameService.getExistingGames(findGameDto);
  }

  @Delete('exit-game')
  async exitGame(@Body() exitGameDto: ExitGameDto) {
    return await this.gameService.exitGame(exitGameDto);
  }
}
