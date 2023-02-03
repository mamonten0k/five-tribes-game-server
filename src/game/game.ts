import {
  GetStatusInQueueParams,
  PlaceInQueueParams,
  RemoveFromQueueParams,
  RetrieveGameDataParams,
  UpdateGameStageDataParams,
} from '../utils/types';

export interface IGameService {
  placeInQueue(params: PlaceInQueueParams): Promise<any>;
  getStatusInQueue(params: GetStatusInQueueParams): Promise<any>;
  retrieveGameData(params: RetrieveGameDataParams): Promise<any>;
  updateGameStage(params: UpdateGameStageDataParams): Promise<any>;
}
