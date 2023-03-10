"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayModule = void 0;
const decorators_1 = require("@nestjs/common/decorators");
const ws_game_module_1 = require("../ws-game/ws-game.module");
const gateway_1 = require("./gateway");
const gateway_session_1 = require("./gateway.session");
let GatewayModule = class GatewayModule {
};
GatewayModule = __decorate([
    (0, decorators_1.Module)({
        imports: [ws_game_module_1.WSGameModule],
        providers: [gateway_1.Gateway, gateway_session_1.GatewaySessionManager],
    })
], GatewayModule);
exports.GatewayModule = GatewayModule;
//# sourceMappingURL=gateway.module.js.map