import { Module } from '@nestjs/common/decorators';
import { WSGameModule } from 'src/ws-game/ws-game.module';

import { Gateway } from './gateway';
import { GatewaySessionManager } from './gateway.session';

@Module({
  imports: [WSGameModule],
  providers: [Gateway, GatewaySessionManager],
})
export class GatewayModule {}
