import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserResponseDto } from 'src/auth/dto/login-user-response.dto';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({ type: UserResponseDto })
  @ApiConflictResponse({ description: 'User with this email already exists' })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    return user;
  }

  @ApiOperation({ summary: 'Login a user' })
  @ApiAcceptedResponse({ type: LoginUserResponseDto })
  @ApiUnauthorizedResponse({ description: 'Invalid email or password' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const data = await this.authService.loginUser(loginUserDto);
    return data;
  }
}
