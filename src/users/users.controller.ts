import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/shared/decorators/is-public.decorator';

@Public()
@Controller('users')
export class UsersController {
  constructor() {}

  @Get('/all')
  getUsers() {
    return { message: 'List of users' };
  }
}
