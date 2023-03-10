"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = exports.Services = exports.Routes = void 0;
exports.Routes = {
    AUTH: 'auth',
    USERS: 'users',
    GAME: 'game',
};
exports.Services = {
    AUTH: 'AUTH_SERVICE',
    USERS: 'USERS_SERVICE',
    REDIS: Symbol('AUTH:REDIS'),
};
exports.Database = {
    URL: 'https://sql.lavro.ru/call.php',
};
//# sourceMappingURL=constants.js.map