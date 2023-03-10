import { OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { TaggedSocket } from 'src/utils/interfaces/socket';
import { IGatewaySessionManager } from './gateway.session';
import { ExitGameParams, HandlePlaceChipParams, InititGameParams, TaggedSocketParams } from 'src/utils/types';
import { IWSGameService } from 'src/ws-game/ws-game';
import { HandleBetDto } from 'src/game/dtos/HandleBet.dto';
export declare class Gateway implements OnGatewayDisconnect {
    readonly sessions: IGatewaySessionManager;
    readonly gameService: IWSGameService;
    constructor(sessions: IGatewaySessionManager, gameService: IWSGameService);
    server: Server;
    handleDisconnect(socket: TaggedSocket): void;
    wsCallGameStageUpdate(params: HandleBetDto): Promise<void>;
    onHandleExitGame(params: ExitGameParams): Promise<void>;
    onHandleBet(params: HandleBetDto): Promise<void>;
    onUpdateProvinces(params: HandlePlaceChipParams): Promise<void>;
    onNewSocket(body: TaggedSocketParams, socket: TaggedSocket): Promise<void>;
    onInitGame(body: InititGameParams, socket: TaggedSocket): Promise<void>;
}
