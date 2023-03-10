"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewaySessionManager = void 0;
const common_1 = require("@nestjs/common");
let GatewaySessionManager = class GatewaySessionManager {
    constructor() {
        this.sessions = new Map();
    }
    getUserSocket(username) {
        return this.sessions.get(username);
    }
    getPlayers(gameId) {
        return Array.from(this.sessions)
            .filter((session) => session[1].gameId === gameId)
            .map((session) => session[1]);
    }
    setUserSocket(username, gameId, socket) {
        this.sessions.set(username, { socket, gameId });
    }
    removeUserSocket(username) {
        this.sessions.delete(username);
    }
    getSockets() {
        return this.sessions;
    }
    updateGameId(username, gameId) {
        const res = this.getUserSocket(username);
        res.gameId = gameId;
    }
};
GatewaySessionManager = __decorate([
    (0, common_1.Injectable)()
], GatewaySessionManager);
exports.GatewaySessionManager = GatewaySessionManager;
//# sourceMappingURL=gateway.session.js.map