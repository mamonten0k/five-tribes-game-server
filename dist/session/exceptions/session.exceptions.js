"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionServerSideException = void 0;
const common_1 = require("@nestjs/common");
class SessionServerSideException extends common_1.HttpException {
    constructor(error_message) {
        super(error_message, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.SessionServerSideException = SessionServerSideException;
//# sourceMappingURL=session.exceptions.js.map