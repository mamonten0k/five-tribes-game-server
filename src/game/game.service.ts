import { Injectable } from '@nestjs/common';
import { IGameService } from './game';

@Injectable()
export class GameService implements IGameService {
  async findGame() {
    return Promise<null>;
  }

  async placeInQueue() {
    return Promise<null>;
  }

  async retrieveGameData() {
    return Promise<null>;
  }

  async updateGameStage() {
    return 0;
  }
}
