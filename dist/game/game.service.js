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
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
const game_exceptions_1 = require("./excteptions/game.exceptions");
const gateway_1 = require("../gateway/gateway");
const database_game_service_1 = require("../database/database.game.service");
const helpers_1 = require("../utils/helpers");
let GameService = class GameService {
    constructor(gameAPI, gateway) {
        this.gameAPI = gameAPI;
        this.gateway = gateway;
    }
    async handlePlaceChip(params) {
        const result = await this.gameAPI.handlePlaceChip(params);
        if (result.rejected) {
            throw new game_exceptions_1.GameServerSideException(result.error_message);
        }
        this.gateway.onUpdateProvinces(params);
        return result;
    }
    async exitGame(params) {
        const result = await this.gameAPI.exitGame(params);
        if (result.rejected) {
            throw new game_exceptions_1.GameServerSideException(result.error_message);
        }
        this.gateway.onHandleExitGame(params);
        return result;
    }
    async hanleBet(params) {
        const result = await this.gameAPI.handleBet(params);
        if (result.rejected) {
            throw new game_exceptions_1.GameServerSideException(result.error_message);
        }
        this.gateway.onHandleBet(params);
    }
    async getExistingGames(params) {
        const result = await this.gameAPI.getExistingGames(params);
        if (result.rejected) {
            throw new game_exceptions_1.GameServerSideException(result.error_message);
        }
        return { games: result['batch-0'] };
    }
    async getBetOptions(params) {
        const result = await this.gameAPI.getBetOptions(params);
        if (result.rejected) {
            throw new game_exceptions_1.GameServerSideException(result.error_message);
        }
        return { playersCoins: result['batch-0'], betOptions: result['batch-1'] };
    }
    async getStatusInQueue(params, retries = 3) {
        const result = await this.gameAPI.getStatusInQueue(params);
        if (result.rejected && retries === 0) {
            await this.gameAPI.removeFromQueue(params);
            throw new game_exceptions_1.GameServerSideException(result.error_message);
        }
        if (result.rejected) {
            await (0, helpers_1.waitFor)(5000);
            return this.getStatusInQueue(params, retries - 1);
        }
        return result;
    }
    async placeInQueue(params) {
        const result = await this.gameAPI.placeInQueue(params);
        if (result.rejected) {
            throw new game_exceptions_1.GameServerSideException(result.error_message);
        }
        return result;
    }
};
GameService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_game_service_1.DatabaseGameService)),
    __param(1, (0, common_1.Inject)(gateway_1.Gateway)),
    __metadata("design:paramtypes", [database_game_service_1.DatabaseGameService,
        gateway_1.Gateway])
], GameService);
exports.GameService = GameService;
//# sourceMappingURL=game.service.js.map