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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_exceptions_1 = require("./exceptions/user.exceptions");
const database_user_service_1 = require("../database/database.user.service");
let UserService = class UserService {
    constructor(userAPI) {
        this.userAPI = userAPI;
    }
    async createUser(params) {
        const response = await this.userAPI.createOne(params);
        if (response.rejected) {
            throw new user_exceptions_1.UserServerSideException(response.error_message);
        }
        return response;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_user_service_1.DatabaseUserService)),
    __metadata("design:paramtypes", [database_user_service_1.DatabaseUserService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map