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
exports.WSGameController = void 0;
const common_1 = require("@nestjs/common");
const ws_game_service_1 = require("./ws-game.service");
let WSGameController = class WSGameController {
    constructor(gameService) {
        this.gameService = gameService;
    }
};
WSGameController = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, common_1.Inject)(ws_game_service_1.WSGameService)),
    __metadata("design:paramtypes", [Object])
], WSGameController);
exports.WSGameController = WSGameController;
//# sourceMappingURL=ws-game.controller.js.map