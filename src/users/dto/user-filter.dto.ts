import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { BaseQueryDto } from 'src/shared/dto/base-query.dto';
import { UserRole } from 'src/users/constants';

export class UserFilterDto extends BaseQueryDto {
  @ApiProperty({
    required: false,
    description: 'Filter users by role',
    example: 'admin',
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
