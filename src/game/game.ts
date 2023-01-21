import {
  FindGameParams,
  PlaceInQueueParams,
  RetrieveGameDataParams,
  UpdateGameStageDataParams,
} from '../utils/types';

export interface IGameService {
  findGame(params: FindGameParams): Promise<any>;
  placeInQueue(params: PlaceInQueueParams): Promise<any>;
  retrieveGameData(params: RetrieveGameDataParams): Promise<any>;
  updateGameStage(params: UpdateGameStageDataParams): Promise<any>;
}
