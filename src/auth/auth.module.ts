import { Module } from '@nestjs/common';

import { SessionModule } from 'src/session/session.module';
import { HashService } from 'src/shared/hash.service';
import { UserModule } from 'src/users/user.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, SessionModule],
  providers: [HashService, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
