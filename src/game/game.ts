import {
  ExitGameParams,
  GetGameDataParams,
  RetrieveGameDataParams,
  UpdateGameStageDataParams,
  WithTokenParams,
} from '../utils/types';

export interface IGameService {
  placeInQueue(params: WithTokenParams): Promise<any>;
  getStatusInQueue(params: WithTokenParams): Promise<any>;
  getExistingGames(params: WithTokenParams): Promise<any>;
  getGameData(params: GetGameDataParams): Promise<any>;
  retrieveGameData(params: RetrieveGameDataParams): Promise<any>;
  updateGameStage(params: UpdateGameStageDataParams): Promise<any>;
  exitGame(params: ExitGameParams): Promise<any>;
}
