import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';

import { CreateUserDto } from './dtos/CreateUser.dto';
import { AuthenticatedGuard } from './utils/Guards';

import { Routes } from '../utils/constants';
import { AuthService } from './auth.service';
import { IAuthService } from './auth';
import { AuthorizeUserDto } from './dtos/AuthorizeUser.dto';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(@Inject(AuthService) private authService: IAuthService) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.registerUser(createUserDto);
  }

  @Post('login')
  async login(@Body() authorizeUserDto: AuthorizeUserDto) {
    return await this.authService.validateUser(authorizeUserDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('status')
  async status() {
    return { session: true };
  }
}
