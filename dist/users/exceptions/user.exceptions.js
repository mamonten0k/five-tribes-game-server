"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServerSideException = void 0;
const common_1 = require("@nestjs/common");
class UserServerSideException extends common_1.HttpException {
    constructor(error_message) {
        super(error_message, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.UserServerSideException = UserServerSideException;
//# sourceMappingURL=user.exceptions.js.map