import { HttpService } from 'src/shared/http.service';
import { ExitGameParams, GetExistingGamesParams, GetGameDataParams, GetStatusInQueueParams, GetTurnsDataParams, HandleBetParams, HandleBetResponse, HandlePlaceChipParams, PlaceInQueueParams, RemoveFromQueueParams, Response } from 'src/utils/types';
export declare class DatabaseGameService {
    private readonly httpService;
    constructor(httpService: HttpService);
    placeInQueue(params: PlaceInQueueParams): Promise<Response<any>>;
    removeFromQueue(params: RemoveFromQueueParams): Promise<Response<any>>;
    getStatusInQueue(params: GetStatusInQueueParams): Promise<Response<any>>;
    getExistingGames(params: GetExistingGamesParams): Promise<Response<any>>;
    exitGame(params: ExitGameParams): Promise<Response<any>>;
    getCurrentTurnData(params: GetGameDataParams): Promise<Response<any>>;
    getGameData(params: GetGameDataParams): Promise<Response<any>>;
    getBetOptions(params: GetGameDataParams): Promise<Response<any>>;
    getTurnsData(params: GetTurnsDataParams): Promise<Response<any>>;
    handleBet(params: HandleBetParams): Promise<Response<HandleBetResponse>>;
    handlePlaceChip(params: HandlePlaceChipParams): Promise<Response<any>>;
    getUpdatedProvinces(params: HandlePlaceChipParams): Promise<Response<any>>;
}
