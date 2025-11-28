import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor() {}

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  getUsers() {
    return { message: 'List of users' };
  }
}
