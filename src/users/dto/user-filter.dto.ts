import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { BaseFilterQueryDto } from 'src/shared/dto/base-query.dto';
import { UserRole } from 'src/users/constants';

export class UserFilterDto extends BaseFilterQueryDto {
  @ApiPropertyOptional({
    description: 'Filter users by role',
    example: 'admin',
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({
    description: 'Filter users by active status',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  isActive?: boolean;
}
