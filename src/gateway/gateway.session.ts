import { Injectable } from '@nestjs/common';
import { TaggedSocket } from '../utils/interfaces/socket';

export interface IGatewaySessionManager {
  getUserSocket(token: string): TaggedSocket;
  setUserSocket(token: string, socket: TaggedSocket): void;
  removeUserSocket(token: string): void;
  getSockets(): Map<string, TaggedSocket>;
}

@Injectable()
export class GatewaySessionManager implements IGatewaySessionManager {
  private readonly sessions: Map<string, TaggedSocket> = new Map();

  getUserSocket(token: string) {
    return this.sessions.get(token);
  }

  setUserSocket(token: string, socket: TaggedSocket) {
    this.sessions.set(token, socket);
  }

  removeUserSocket(token: string) {
    this.sessions.delete(token);
  }

  getSockets(): Map<string, TaggedSocket> {
    return this.sessions;
  }
}
