"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketAdapter = void 0;
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
class WebsocketAdapter extends platform_socket_io_1.IoAdapter {
    createIOServer(port, options) {
        const server = super.createIOServer(port, options);
        return server;
    }
}
exports.WebsocketAdapter = WebsocketAdapter;
//# sourceMappingURL=gateway.adapter.js.map