import {
  GetBetOptionsParams,
  GetGameDataParams,
  GetTurnsDataParams,
  HandlePlaceChipParams,
} from '../utils/types';

export interface IWSGameService {
  getGameData(params: GetGameDataParams): Promise<any>;
  getTurnsData(params: GetTurnsDataParams): Promise<any>;
  getBetOptions(params: GetBetOptionsParams): Promise<any>;
  getCurrentTurnData(params: GetGameDataParams): Promise<any>;
  getUpdatedProvinces(params: HandlePlaceChipParams): Promise<any>;
}
