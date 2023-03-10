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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const CreateUser_dto_1 = require("./dtos/CreateUser.dto");
const Guards_1 = require("./utils/Guards");
const constants_1 = require("../utils/constants");
const auth_service_1 = require("./auth.service");
const AuthorizeUser_dto_1 = require("./dtos/AuthorizeUser.dto");
const credentials_pipe_1 = require("../utils/pipes/credentials.pipe");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async test() {
        return 'JUST TESTING';
    }
    async registerUser(createUserDto) {
        return await this.authService.registerUser(createUserDto);
    }
    async login(authorizeUserDto) {
        return await this.authService.validateUser(authorizeUserDto);
    }
    async status() {
        return { session: true };
    }
};
__decorate([
    (0, common_1.UsePipes)(new credentials_pipe_1.CredentialsValidationPipe()),
    (0, common_1.Post)('test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "test", null);
__decorate([
    (0, common_1.UsePipes)(new credentials_pipe_1.CredentialsValidationPipe()),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUser_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerUser", null);
__decorate([
    (0, common_1.UsePipes)(new credentials_pipe_1.CredentialsValidationPipe()),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AuthorizeUser_dto_1.AuthorizeUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(Guards_1.AuthenticatedGuard),
    (0, common_1.Get)('status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "status", null);
AuthController = __decorate([
    (0, common_1.Controller)(constants_1.Routes.AUTH),
    __param(0, (0, common_1.Inject)(auth_service_1.AuthService)),
    __metadata("design:paramtypes", [Object])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map