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
exports.GameController = void 0;
const common_1 = require("@nestjs/common");
const Guards_1 = require("../auth/utils/Guards");
const constants_1 = require("../utils/constants");
const FindGame_dto_1 = require("./dtos/FindGame.dto");
const FindGames_dto_1 = require("./dtos/FindGames.dto");
const game_service_1 = require("./game.service");
const ExitGame_dto_1 = require("./dtos/ExitGame.dto");
const FindGameData_dto_1 = require("./dtos/FindGameData.dto");
const HandleBet_dto_1 = require("./dtos/HandleBet.dto");
let GameController = class GameController {
    constructor(gameService) {
        this.gameService = gameService;
    }
    async findGame(findGameDto) {
        await this.gameService.placeInQueue(findGameDto);
        return await this.gameService.getStatusInQueue(findGameDto);
    }
    async findExistingGames(findGameDto) {
        return await this.gameService.getExistingGames(findGameDto);
    }
    async handleBet(hanleBetDto) {
        this.gameService.hanleBet(hanleBetDto);
    }
    async placeChip(placeChipsDto) {
        return await this.gameService.handlePlaceChip(placeChipsDto);
    }
    async getBetOptions(findGameDto) {
        return await this.gameService.getBetOptions(findGameDto);
    }
    async exitGame(exitGameDto) {
        return await this.gameService.exitGame(exitGameDto);
    }
};
__decorate([
    (0, common_1.Post)('game-status'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FindGame_dto_1.FindGameDto]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "findGame", null);
__decorate([
    (0, common_1.Post)('existing-games'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FindGames_dto_1.FindGamesDto]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "findExistingGames", null);
__decorate([
    (0, common_1.Post)('handle-bet'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [HandleBet_dto_1.HandleBetDto]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "handleBet", null);
__decorate([
    (0, common_1.Post)('place-chip'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "placeChip", null);
__decorate([
    (0, common_1.Post)('bet-options'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FindGameData_dto_1.FindGameDataDto]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "getBetOptions", null);
__decorate([
    (0, common_1.Delete)('exit-game'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ExitGame_dto_1.ExitGameDto]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "exitGame", null);
GameController = __decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard),
    (0, common_1.Controller)(constants_1.Routes.GAME),
    __param(0, (0, common_1.Inject)(game_service_1.GameService)),
    __metadata("design:paramtypes", [Object])
], GameController);
exports.GameController = GameController;
//# sourceMappingURL=game.controller.js.map