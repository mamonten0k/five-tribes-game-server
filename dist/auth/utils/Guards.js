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
exports.AuthenticatedGuard = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("@nestjs/common/decorators");
const session_service_1 = require("../../session/session.service");
const helpers_1 = require("../../utils/helpers");
let AuthenticatedGuard = class AuthenticatedGuard {
    constructor(sessionService) {
        this.sessionService = sessionService;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const token = (0, helpers_1.parseBearerHeader)(req);
        return await this.sessionService.validateSession({ token });
    }
};
AuthenticatedGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, decorators_1.Inject)(session_service_1.SessionService)),
    __metadata("design:paramtypes", [session_service_1.SessionService])
], AuthenticatedGuard);
exports.AuthenticatedGuard = AuthenticatedGuard;
//# sourceMappingURL=Guards.js.map