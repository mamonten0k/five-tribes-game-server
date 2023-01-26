import { Module } from '@nestjs/common/decorators';
import { GameModule } from 'src/game/game.module';

import { Gateway } from './gateway';
import { GatewaySessionManager } from './gateway.session';

@Module({
  imports: [GameModule],
  providers: [Gateway, GatewaySessionManager],
})
export class GatewayModule {}
