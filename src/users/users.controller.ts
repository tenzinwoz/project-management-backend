import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
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

  @ApiProperty({
    description: 'Update user by ID',
    example: 1,
  })
  @ApiAcceptedResponse({
    description: 'User updated successfully',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid user ID or user not found',
  })
  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  async patchUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.usersService.patchUser(id, body);
  }

  @ApiProperty({
    description: 'Delete user by ID',
    example: 1,
  })
  @ApiNoContentResponse({
    description: 'The user has been successfully deactivated.',
  })
  @ApiNotFoundResponse({
    description: 'User not found (e.g., the provided ID does not exist).',
  })
  @ApiBadRequestResponse({
    description: 'Invalid ID format.',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error occurred.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/delete/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }

  @ApiProperty({
    description: 'Restore user by ID',
    example: 1,
  })
  @ApiNoContentResponse({
    description: 'The user has been successfully reactivated.',
  })
  @ApiNotFoundResponse({
    description: 'User not found (e.g., the provided ID does not exist).',
  })
  @ApiBadRequestResponse({
    description: 'Invalid ID format.',
  })
  @ApiInternalServerErrorResponse({ description: 'Server error occurred.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('/restore/:id')
  async restoreUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.restoreUser(id);
  }
}
