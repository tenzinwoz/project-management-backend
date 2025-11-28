import { ApiProperty } from '@nestjs/swagger';

export class LoginUserResponseDto {
  @ApiProperty({
    description: 'JWT access token for authenticated requests',
    example: 'jwt-token',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh token to obtain new access tokens',
    example: 'refresh-token',
  })
  refreshToken: string;

  constructor(partial: Partial<LoginUserResponseDto>) {
    Object.assign(this, partial);
  }
}
