import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { UserFilterDto } from 'src/users/dto/user-filter.dto';
import {
  UserPaginatedResponseDto,
  UserResponseDto,
} from 'src/users/dto/user-response.dto';
import { UsersService } from 'src/users/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiProperty({
    description: 'Get a paginated list of users',
    example: {},
  })
  @ApiOkResponse({
    description: 'Users retrieved successfully',
    type: UserPaginatedResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid query parameters',
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getUsers(@Query() params: UserFilterDto) {
    return this.usersService.getUsers(params);
  }

  @ApiProperty({
    description: 'Get user by ID',
    example: 1,
  })
  @ApiAcceptedResponse({
    description: 'User retrieved successfully',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid user ID or user not found',
  })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findUserById(id);
  }
}
