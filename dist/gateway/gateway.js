"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const gateway_session_1 = require("./gateway.session");
const ws_game_service_1 = require("../ws-game/ws-game.service");
let Gateway = class Gateway {
    constructor(sessions, gameService) {
        this.sessions = sessions;
        this.gameService = gameService;
    }
    handleDisconnect(socket) {
        this.sessions.removeUserSocket(socket.tag);
        socket._cleanup();
        socket.disconnect();
    }
    async wsCallGameStageUpdate(params) {
        const players = this.sessions.getPlayers(params.gameId);
        const turnsData = await this.gameService.getTurnsData(Object.assign({}, params));
        players.forEach((player) => player.socket.emit('onSendGameState', Object.assign({}, turnsData)));
    }
    async onHandleExitGame(params) {
        const players = this.sessions.getPlayers(params.gameId);
        try {
            const data = await this.gameService.getGameData(Object.assign({}, params));
            players.forEach((player) => {
                player.socket.emit('onGameEnd', Object.assign({}, data));
                player.socket.disconnect();
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    async onHandleBet(params) {
        const players = this.sessions.getPlayers(params.gameId);
        try {
            const data = await this.gameService.getGameData(Object.assign({}, params));
            players.forEach((player) => player.socket.emit('onSendUpdateBetsData', Object.assign({}, data)));
        }
        catch (e) {
            console.log(e);
        }
    }
    async onUpdateProvinces(params) {
        const players = this.sessions.getPlayers(params.gameId);
        const gameData = await this.gameService.getGameData(Object.assign({}, params));
        if ((gameData === null || gameData === void 0 ? void 0 : gameData.round) === -1) {
            players.forEach((player) => {
                player.socket.emit('onGameEnd', Object.assign({}, gameData));
                player.socket.disconnect();
            });
        }
        if (gameData.activePlayer !== params.player) {
            const data = await this.gameService.getUpdatedProvinces(Object.assign({}, params));
            players.forEach((player) => player.socket.emit('onSendUpdateProvinces', Object.assign({}, data)));
            players.forEach((player) => player.socket.emit('onSendUpdateSecondStageData', Object.assign({}, gameData)));
        }
        else {
            const data = await this.gameService.getUpdatedProvinces(Object.assign({}, params));
            players.forEach((player) => player.socket.emit('onSendUpdateProvinces', Object.assign({}, data)));
        }
    }
    async onNewSocket(body, socket) {
        socket.tag = body.username;
        this.sessions.setUserSocket(socket.tag, body.gameId, socket);
        socket.emit('onSendSocketTagged');
    }
    async onInitGame(body, socket) {
        const data = await this.gameService.getGameData(Object.assign({}, body));
        const rival = this.sessions.getUserSocket(data.rival);
        if (data.round === -1) {
            console.log('here', data);
            socket.emit('onGameEnd', Object.assign({}, data));
            socket.disconnect();
            rival === null || rival === void 0 ? void 0 : rival.socket.emit('onGameEnd', Object.assign({}, data));
            rival === null || rival === void 0 ? void 0 : rival.socket.disconnect();
        }
        else {
            socket.emit('onRivalConnected', Object.assign({}, data));
            rival === null || rival === void 0 ? void 0 : rival.socket.emit('onRivalConnected', Object.assign({}, data));
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], Gateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('onNewSocket'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Gateway.prototype, "onNewSocket", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('onInitGame'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], Gateway.prototype, "onInitGame", null);
Gateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: ['http://localhost:3000'],
            credentials: true,
        },
        pingInterval: 10000,
        pingTimeout: 15000,
    }),
    __param(0, (0, common_1.Inject)(gateway_session_1.GatewaySessionManager)),
    __param(1, (0, common_1.Inject)(ws_game_service_1.WSGameService)),
    __metadata("design:paramtypes", [Object, Object])
], Gateway);
exports.Gateway = Gateway;
//# sourceMappingURL=gateway.js.map