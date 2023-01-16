import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { DatabaseUserService } from 'src/database/database.user.service';
import { HttpService } from 'src/shared/http.service';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [HttpService, DatabaseUserService, UserService],
  exports: [UserService],
})
export class UserModule {}
