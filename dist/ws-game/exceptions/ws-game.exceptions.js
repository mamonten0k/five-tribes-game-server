"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WSGameServerSideException = void 0;
const common_1 = require("@nestjs/common");
class WSGameServerSideException extends common_1.HttpException {
    constructor(error_message) {
        super(error_message, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.WSGameServerSideException = WSGameServerSideException;
//# sourceMappingURL=ws-game.exceptions.js.map