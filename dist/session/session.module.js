"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
const database_session_service_1 = require("../database/database.session.service");
const hash_service_1 = require("../shared/hash.service");
const http_service_1 = require("../shared/http.service");
const session_controller_1 = require("./session.controller");
const session_service_1 = require("./session.service");
let SessionModule = class SessionModule {
};
SessionModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [session_controller_1.SessionController],
        providers: [http_service_1.HttpService, hash_service_1.HashService, database_session_service_1.DatabaseSessionService, session_service_1.SessionService],
        exports: [session_service_1.SessionService],
    })
], SessionModule);
exports.SessionModule = SessionModule;
//# sourceMappingURL=session.module.js.map