import { Injectable } from '@nestjs/common';
import { TaggedSocket } from '../utils/interfaces/socket';

export interface IGatewaySessionManager {
  getUserSocket(id: number): TaggedSocket;
  setUserSocket(id: number, socket: TaggedSocket): void;
  removeUserSocket(id: number): void;
  getSockets(): Map<number, TaggedSocket>;
}

@Injectable()
export class GatewaySessionManager implements IGatewaySessionManager {
  private readonly sessions: Map<number, TaggedSocket> = new Map();

  getUserSocket(id: number) {
    return this.sessions.get(id);
  }

  setUserSocket(userId: number, socket: TaggedSocket) {
    this.sessions.set(userId, socket);
  }
  removeUserSocket(userId: number) {
    this.sessions.delete(userId);
  }
  getSockets(): Map<number, TaggedSocket> {
    return this.sessions;
  }
}
