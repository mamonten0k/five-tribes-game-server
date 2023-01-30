import { Injectable } from '@nestjs/common';
import { TaggedSocket } from '../utils/interfaces/socket';

export interface IGatewaySessionManager {
  getUserSocket(username: string): TaggedSocket;
  setUserSocket(username: string, socket: TaggedSocket): void;
  removeUserSocket(username: string): void;
  getSockets(): Map<string, TaggedSocket>;
}

@Injectable()
export class GatewaySessionManager implements IGatewaySessionManager {
  private readonly sessions: Map<string, TaggedSocket> = new Map();

  getUserSocket(username: string) {
    return this.sessions.get(username);
  }

  setUserSocket(username: string, socket: TaggedSocket) {
    this.sessions.set(username, socket);
  }

  removeUserSocket(username: string) {
    this.sessions.delete(username);
  }

  getSockets(): Map<string, TaggedSocket> {
    return this.sessions;
  }
}
