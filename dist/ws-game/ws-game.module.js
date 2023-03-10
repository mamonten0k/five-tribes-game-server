"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WSGameModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
const ws_game_service_1 = require("./ws-game.service");
const ws_game_controller_1 = require("./ws-game.controller");
const database_game_service_1 = require("../database/database.game.service");
const http_service_1 = require("../shared/http.service");
const session_service_1 = require("../session/session.service");
const database_session_service_1 = require("../database/database.session.service");
let WSGameModule = class WSGameModule {
};
WSGameModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [ws_game_controller_1.WSGameController],
        providers: [
            ws_game_service_1.WSGameService,
            http_service_1.HttpService,
            database_game_service_1.DatabaseGameService,
            session_service_1.SessionService,
            database_session_service_1.DatabaseSessionService,
        ],
        exports: [ws_game_service_1.WSGameService],
    })
], WSGameModule);
exports.WSGameModule = WSGameModule;
//# sourceMappingURL=ws-game.module.js.map