import { FindGameDto } from './dtos/FindGame.dto';
import { FindGamesDto } from './dtos/FindGames.dto';
import { IGameService } from './game';
import { ExitGameDto } from './dtos/ExitGame.dto';
import { FindGameDataDto } from './dtos/FindGameData.dto';
import { HandleBetDto } from './dtos/HandleBet.dto';
import { HandlePlaceChipParams } from 'src/utils/types';
export declare class GameController {
    private readonly gameService;
    constructor(gameService: IGameService);
    findGame(findGameDto: FindGameDto): Promise<any>;
    findExistingGames(findGameDto: FindGamesDto): Promise<any>;
    handleBet(hanleBetDto: HandleBetDto): Promise<void>;
    placeChip(placeChipsDto: HandlePlaceChipParams): Promise<any>;
    getBetOptions(findGameDto: FindGameDataDto): Promise<any>;
    exitGame(exitGameDto: ExitGameDto): Promise<any>;
}
