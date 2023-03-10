import { GetBetOptionsParams, GetGameDataParams, GetTurnsDataParams, HandlePlaceChipParams } from 'src/utils/types';
import { DatabaseGameService } from 'src/database/database.game.service';
import { IWSGameService } from './ws-game';
export declare class WSGameService implements IWSGameService {
    private readonly gameAPI;
    constructor(gameAPI: DatabaseGameService);
    getUpdatedProvinces(params: HandlePlaceChipParams): Promise<any>;
    getBetOptions(params: GetBetOptionsParams): Promise<any>;
    getTurnsData(params: GetTurnsDataParams): Promise<any>;
    getCurrentTurnData(params: GetGameDataParams): Promise<any>;
    getGameData(params: GetGameDataParams): Promise<any>;
}
