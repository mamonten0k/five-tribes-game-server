import {
  ExitGameParams,
  GetBetOptionsParams,
  HandlePlaceChipParams,
  WithTokenParams,
} from '../utils/types';
import { HandleBetDto } from './dtos/HandleBet.dto';

export interface IGameService {
  placeInQueue(params: WithTokenParams): Promise<any>;
  getStatusInQueue(params: WithTokenParams): Promise<any>;
  getExistingGames(params: WithTokenParams): Promise<any>;
  getBetOptions(params: GetBetOptionsParams): Promise<any>;
  hanleBet(params: HandleBetDto): void;
  handlePlaceChip(params: HandlePlaceChipParams): Promise<any>;
  exitGame(params: ExitGameParams): Promise<any>;
}
