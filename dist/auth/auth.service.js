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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const hash_service_1 = require("../shared/hash.service");
const user_service_1 = require("../users/user.service");
const session_service_1 = require("../session/session.service");
let AuthService = class AuthService {
    constructor(sessionService, userService, crypto) {
        this.sessionService = sessionService;
        this.userService = userService;
        this.crypto = crypto;
    }
    async validateUser(params) {
        params.password = this.crypto.hash(params.password);
        const response = await this.sessionService.createSession(params);
        return response;
    }
    async registerUser(params) {
        params.password = this.crypto.hash(params.password);
        const response = await this.userService.createUser(params);
        return response;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(session_service_1.SessionService)),
    __param(1, (0, common_1.Inject)(user_service_1.UserService)),
    __param(2, (0, common_1.Inject)(hash_service_1.HashService)),
    __metadata("design:paramtypes", [Object, Object, hash_service_1.HashService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map