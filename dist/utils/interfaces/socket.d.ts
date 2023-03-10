import { Socket } from 'socket.io';
export interface TaggedSocket extends Socket {
    tag?: string;
}
export interface GameSession {
    gameId: string;
    socket: TaggedSocket;
}
