import { ExitGameParams, GetBetOptionsParams, GetStatusInQueueParams, HandlePlaceChipParams, WithTokenParams } from 'src/utils/types';
import { Gateway } from 'src/gateway/gateway';
import { DatabaseGameService } from 'src/database/database.game.service';
import { IGameService } from './game';
import { HandleBetDto } from './dtos/HandleBet.dto';
export declare class GameService implements IGameService {
    private readonly gameAPI;
    private readonly gateway;
    constructor(gameAPI: DatabaseGameService, gateway: Gateway);
    handlePlaceChip(params: HandlePlaceChipParams): Promise<any>;
    exitGame(params: ExitGameParams): Promise<any>;
    hanleBet(params: HandleBetDto): Promise<any>;
    getExistingGames(params: WithTokenParams): Promise<any>;
    getBetOptions(params: GetBetOptionsParams): Promise<any>;
    getStatusInQueue(params: GetStatusInQueueParams, retries?: number): any;
    placeInQueue(params: any): Promise<import("src/utils/types").Response<any>>;
}
