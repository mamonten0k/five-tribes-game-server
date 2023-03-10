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
exports.WSGameService = void 0;
const common_1 = require("@nestjs/common");
const ws_game_exceptions_1 = require("./exceptions/ws-game.exceptions");
const database_game_service_1 = require("../database/database.game.service");
let WSGameService = class WSGameService {
    constructor(gameAPI) {
        this.gameAPI = gameAPI;
    }
    async getUpdatedProvinces(params) {
        const result = await this.gameAPI.getUpdatedProvinces(params);
        if (result && result.rejected) {
            throw new ws_game_exceptions_1.WSGameServerSideException(result.error_message);
        }
        return {
            provincesToUpdate: result ? result['batch-0'] : [],
        };
    }
    async getBetOptions(params) {
        const result = await this.gameAPI.getBetOptions(params);
        if (result.rejected) {
            throw new ws_game_exceptions_1.WSGameServerSideException(result.error_message);
        }
        return {
            playersCoins: result['batch-0'],
            betOptions: result['batch-1'],
        };
    }
    async getTurnsData(params) {
        const result = await this.gameAPI.getTurnsData(params);
        if (result.rejected) {
            throw new ws_game_exceptions_1.WSGameServerSideException(result.error_message);
        }
        if (result.notification) {
            return { notificationMessage: result.notification_message };
        }
        return { playersCoins: result['batch-0'], betOptions: result['batch-1'] };
    }
    async getCurrentTurnData(params) {
        const result = await this.gameAPI.getCurrentTurnData(params);
        if (result.rejected) {
            throw new ws_game_exceptions_1.WSGameServerSideException(result.error_message);
        }
        if (result.notification) {
            return Object.assign(Object.assign({}, result['batch-0'][0]), { notificationMessage: result.notification_message });
        }
        return Object.assign(Object.assign({}, result['batch-0'][0]), { turnsOrder: result['batch-1'][0] });
    }
    async getGameData(params) {
        const result = await this.gameAPI.getGameData(params);
        if (result.rejected) {
            throw new ws_game_exceptions_1.WSGameServerSideException(result.error_message);
        }
        return Object.assign(Object.assign(Object.assign({}, (result['batch-0'] ? result['batch-0'][0] : [])), (result['batch-1'] ? result['batch-1'][0] : [])), { turnsOrder: result['batch-2'] || [], playersCoins: result['batch-3'] || [], betOptions: result['batch-4'] || [], gameProvinces: result['batch-5'] || [], gameChips: result['batch-6'] || [], ownedProvinces: result['batch-7'] || [], ownedChips: result['batch-8'] || [] });
    }
};
WSGameService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_game_service_1.DatabaseGameService)),
    __metadata("design:paramtypes", [database_game_service_1.DatabaseGameService])
], WSGameService);
exports.WSGameService = WSGameService;
//# sourceMappingURL=ws-game.service.js.map