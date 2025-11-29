import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { LoginUserResponseDto } from 'src/auth/dto/login-user-response.dto';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async generateTokens(payload: {
    sub: number;
    email: string;
  }): Promise<{ accessToken: string; refreshToken: string }> {
    const access_token = await this.jwtService.signAsync(payload);

    const data = {
      accessToken: access_token,
      refreshToken: 'mocked_refresh_token',
    };
    return data;
  }

  async loginUser(userDto: LoginUserDto): Promise<LoginUserResponseDto> {
    const user = await this.userRepo.findUserByEmail(userDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await compare(userDto.password, user.password);

    // In a real application, you should hash and compare passwords securely
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Jwt token generation
    const payload = { sub: user.id, email: user.email };

    const data = await this.generateTokens(payload);

    return plainToInstance(LoginUserResponseDto, data);
  }
}
