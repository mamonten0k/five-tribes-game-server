"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameServerSideException = void 0;
const common_1 = require("@nestjs/common");
class GameServerSideException extends common_1.HttpException {
    constructor(error_message) {
        super(error_message, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.GameServerSideException = GameServerSideException;
//# sourceMappingURL=game.exceptions.js.map