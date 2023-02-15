import { Injectable } from '@nestjs/common';
import { GameSession, TaggedSocket } from '../utils/interfaces/socket';

export interface IGatewaySessionManager {
  getUserSocket(username: string): GameSession;
  setUserSocket(username: string, gameId: string, socket: TaggedSocket): void;
  removeUserSocket(username: string): void;
  getSockets(): Map<string, GameSession>;
}

@Injectable()
export class GatewaySessionManager implements IGatewaySessionManager {
  private readonly sessions: Map<string, GameSession> = new Map();

  getUserSocket(username: string) {
    return this.sessions.get(username);
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
}
