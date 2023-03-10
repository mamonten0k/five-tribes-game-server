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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseSessionService = void 0;
const common_1 = require("@nestjs/common");
const http_service_1 = require("../shared/http.service");
let DatabaseSessionService = class DatabaseSessionService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    createSession(params) {
        return this.httpService.post(process.env.DATABASE_LINK, {
            params: {
                db: process.env.DATABASE_ID,
                pname: 'create_session',
                p1: params.username,
                p2: params.password,
            },
        });
    }
    validateSession(params) {
        return this.httpService.post(process.env.DATABASE_LINK, {
            params: {
                db: process.env.DATABASE_ID,
                pname: 'validate_session',
                p1: params.token,
            },
        });
    }
};
DatabaseSessionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [http_service_1.HttpService])
], DatabaseSessionService);
exports.DatabaseSessionService = DatabaseSessionService;
//# sourceMappingURL=database.session.service.js.map