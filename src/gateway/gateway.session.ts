import { Injectable } from '@nestjs/common';
import { GameSession, TaggedSocket } from '../utils/interfaces/socket';

export interface IGatewaySessionManager {
  getUserSocket(username: string): GameSession;
  getPlayers(gameID: string): Array<GameSession>;
  setUserSocket(username: string, gameId: string, socket: TaggedSocket): void;
  removeUserSocket(username: string): void;
  getSockets(): Map<string, GameSession>;
  updateGameId(username: string, gameId: string): void;
}

@Injectable()
export class GatewaySessionManager implements IGatewaySessionManager {
  private readonly sessions: Map<string, GameSession> = new Map();

  getUserSocket(username: string) {
    return this.sessions.get(username);
  }

  getPlayers(gameId: string) {
    return Array.from(this.sessions)
      .filter((session) => session[1].gameId === gameId)
      .map((session) => session[1]);
  }

  setUserSocket(username: string, gameId: string, socket: TaggedSocket) {
    this.sessions.set(username, { socket, gameId });
  }

  removeUserSocket(username: string) {
    this.sessions.delete(username);
  }

  getSockets(): Map<string, GameSession> {
    return this.sessions;
  }

  updateGameId(username: string, gameId: string) {
    const res = this.getUserSocket(username);
    res.gameId = gameId;
  }
}
