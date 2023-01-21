import { Module } from '@nestjs/common/decorators';
import { GameModule } from 'src/game/game.module';

import { Gateway } from './gateway';

@Module({
  imports: [GameModule],
  providers: [Gateway],
})
export class GatewayModule {}
