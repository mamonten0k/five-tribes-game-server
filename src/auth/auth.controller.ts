import {
  Body,
  CACHE_MANAGER,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';

import { Cache } from 'cache-manager';

import { CreateUserDto } from './dtos/CreateUser.dto';
import { AuthenticatedGuard, LocalAuthGuard } from './utils/Guards';

import { Routes } from '../utils/constants';
import { UserService } from '../users/user.service';
import { IUserService } from '../users/user';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(@Inject(UserService) private userService: IUserService) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login() {
    return HttpStatus.OK;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('status')
  async status() {
    return { session: true };
  }
}
