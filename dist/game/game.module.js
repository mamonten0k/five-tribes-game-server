"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
const game_service_1 = require("./game.service");
const game_controller_1 = require("./game.controller");
const database_game_service_1 = require("../database/database.game.service");
const Guards_1 = require("../auth/utils/Guards");
const http_service_1 = require("../shared/http.service");
const session_service_1 = require("../session/session.service");
const database_session_service_1 = require("../database/database.session.service");
const gateway_module_1 = require("../gateway/gateway.module");
const gateway_1 = require("../gateway/gateway");
const ws_game_module_1 = require("../ws-game/ws-game.module");
const ws_game_service_1 = require("../ws-game/ws-game.service");
const gateway_session_1 = require("../gateway/gateway.session");
let GameModule = class GameModule {
};
GameModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, gateway_module_1.GatewayModule, (0, common_1.forwardRef)(() => ws_game_module_1.WSGameModule)],
        controllers: [game_controller_1.GameController],
        providers: [
            game_service_1.GameService,
            http_service_1.HttpService,
            database_game_service_1.DatabaseGameService,
            Guards_1.AuthenticatedGuard,
            session_service_1.SessionService,
            database_session_service_1.DatabaseSessionService,
            gateway_1.Gateway,
            ws_game_service_1.WSGameService,
            gateway_session_1.GatewaySessionManager,
        ],
        exports: [game_service_1.GameService],
    })
], GameModule);
exports.GameModule = GameModule;
//# sourceMappingURL=game.module.js.map