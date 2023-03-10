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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseGameService = void 0;
const common_1 = require("@nestjs/common");
const http_service_1 = require("../shared/http.service");
let DatabaseGameService = class DatabaseGameService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    placeInQueue(params) {
        return this.httpService.post(process.env.DATABASE_LINK, {
            params: {
                db: process.env.DATABASE_ID,
                pname: 'place_in_queue',
                p1: params.token,
            },
        });
    }
    removeFromQueue(params) {
        return this.httpService.post(process.env.DATABASE_LINK, {
            params: {
                db: process.env.DATABASE_ID,
                pname: 'remove_from_queue',
                p1: params.token,
            },
        });
    }
    getStatusInQueue(params) {
        return this.httpService.post(process.env.DATABASE_LINK, {
            params: {
                db: process.env.DATABASE_ID,
                pname: 'get_status_in_queue',
                p1: params.token,
            },
        });
    }
    getExistingGames(params) {
        return this.httpService.postRows(process.env.DATABASE_LINK, {
            params: {
                db: process.env.DATABASE_ID,
                pname: 'get_existing_games',
                p1: params.token,
                format: 'rows',
            },
        });
    }
    exitGame(params) {
        return this.httpService.post(process.env.DATABASE_LINK, {
            params: {
                db: process.env.DATABASE_ID,
                pname: 'exit_game',
                p1: params.token,
                p2: params.gameId,
            },
        });
    }
    getCurrentTurnData(params) {
        return this.httpService.postRows(process.env.DATABASE_LINK, {
            params: {
                db: process.env.DATABASE_ID,
                pname: 'get_current_turn_data',
                p1: params.token,
                p2: params.gameId,
                format: 'rows',
            },
        });
    }
    getGameData(params) {
        return this.httpService.postRows(process.env.DATABASE_LINK, {
            params: {
                db: process.env.DATABASE_ID,
                pname: 'get_game_data',
                p1: params.token,
                p2: params.gameId,
                format: 'rows',
            },
        });
    }
    getBetOptions(params) {
        return this.httpService.postRows(process.env.DATABASE_LINK, {
            params: {
                db: process.env.DATABASE_ID,
                pname: 'get_bet_options',
                p1: params.token,
                p2: params.gameId,
                format: 'rows',
            },
        });
    }
    getTurnsData(params) {
        return this.httpService.postRows(process.env.DATABASE_LINK, {
            params: {
                db: process.env.DATABASE_ID,
                pname: 'get_turns_order',
                p1: params.token,
                p2: params.gameId,
                format: 'rows',
            },
        });
    }
    handleBet(params) {
        return this.httpService.post(process.env.DATABASE_LINK, {
            params: {
                db: process.env.DATABASE_ID,
                pname: 'handle_bet',
                p1: params.token,
                p2: String(params.betId),
                p3: params.gameId,
            },
        });
    }
    handlePlaceChip(params) {
        return this.httpService.post(process.env.DATABASE_LINK, {
            params: {
                db: process.env.DATABASE_ID,
                pname: 'handle_place_chip',
                p1: params.token,
                p2: String(params.chipId),
                p3: String(params.provinceId),
                p4: params.gameId,
            },
        });
    }
    getUpdatedProvinces(params) {
        return this.httpService.postRows(process.env.DATABASE_LINK, {
            params: {
                db: process.env.DATABASE_ID,
                pname: 'get_updated_provinces',
                p1: params.token,
                p2: String(params.provinceId),
                p3: params.gameId,
                format: 'rows',
            },
        });
    }
};
DatabaseGameService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], DatabaseGameService);
exports.DatabaseGameService = DatabaseGameService;
//# sourceMappingURL=database.game.service.js.map