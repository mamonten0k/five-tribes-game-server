import { Module } from '@nestjs/common/decorators';

import { Gateway } from './gateway';

@Module({
  providers: [Gateway],
})
export class GatewayModule {}
