// import { OnModuleInit } from '@nestjs/common';
// import { Injectable } from '@nestjs/common/decorators';

// import { io, Socket } from 'socket.io-client';

// @Injectable()
// export class SocketClient implements OnModuleInit {
//   public socetClient: Socket;

//   constructor() {
//     this.socetClient = io('http://localhost:3001');
//   }

//   onModuleInit() {
//     this.socetClient.on('connect', () => {
//       console.log('Connected');
//     });
//   }
// }
