import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoginUserResponseDto {
  @ApiProperty({
    description: 'JWT access token for authenticated requests',
    example: 'jwt-token',
  })
  @Expose()
  accessToken: string;

  @ApiProperty({
    description: 'Refresh token to obtain new access tokens',
    example: 'refresh-token',
  })
  @Expose()
  refreshToken: string;
}
