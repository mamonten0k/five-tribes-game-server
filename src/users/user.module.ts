import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { DatabaseUserService } from 'src/database/database.user.service';
import { HashService } from 'src/shared/hash.service';
import { HttpService } from 'src/shared/http.service';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [HttpService, HashService, DatabaseUserService, UserService],
  exports: [UserService],
})
export class UserModule {}
