import { Socket } from 'socket.io';

export interface TaggedSocket extends Socket {
  tag?: string;
}
