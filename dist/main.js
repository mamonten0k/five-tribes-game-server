"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const gateway_adapter_1 = require("./gateway/gateway.adapter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({ credentials: true, origin: true });
    const adapter = new gateway_adapter_1.WebsocketAdapter(app);
    app.useWebSocketAdapter(adapter);
    await app.listen(9001);
}
bootstrap();
//# sourceMappingURL=main.js.map