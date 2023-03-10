"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
let CredentialsValidationPipe = class CredentialsValidationPipe {
    async transform(params) {
        if (!params.username || params.username.length < 4) {
            throw new common_1.BadRequestException('Логин должен составлять не менее\n 4 знаков');
        }
        if (!params.password || params.password.length < 6) {
            throw new common_1.BadRequestException('Пароль должен составлять не менее\n 6 знаков');
        }
        return params;
    }
};
CredentialsValidationPipe = __decorate([
    (0, common_2.Injectable)()
], CredentialsValidationPipe);
exports.CredentialsValidationPipe = CredentialsValidationPipe;
//# sourceMappingURL=credentials.pipe.js.map