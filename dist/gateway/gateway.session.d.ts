import { GameSession, TaggedSocket } from '../utils/interfaces/socket';
export interface IGatewaySessionManager {
    getUserSocket(username: string): GameSession;
    getPlayers(gameID: string): Array<GameSession>;
    setUserSocket(username: string, gameId: string, socket: TaggedSocket): void;
    removeUserSocket(username: string): void;
    getSockets(): Map<string, GameSession>;
    updateGameId(username: string, gameId: string): void;
}
export declare class GatewaySessionManager implements IGatewaySessionManager {
    private readonly sessions;
    getUserSocket(username: string): GameSession;
    getPlayers(gameId: string): GameSession[];
    setUserSocket(username: string, gameId: string, socket: TaggedSocket): void;
    removeUserSocket(username: string): void;
    getSockets(): Map<string, GameSession>;
    updateGameId(username: string, gameId: string): void;
}
