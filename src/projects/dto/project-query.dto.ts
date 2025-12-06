import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { ProjectStatus } from 'src/projects/constants';
import { BaseFilterQueryDto } from 'src/shared/dto/base-query.dto';

export class ProjectFilterQueryDto extends BaseFilterQueryDto {
  @ApiPropertyOptional({
    description: 'Filter projects by status',
    example: ProjectStatus.ACTIVE,
  })
  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @ApiPropertyOptional({
    description: 'Filter projects by its owner user ID',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  userId?: number;

  @ApiPropertyOptional({
    description:
      'The start date of the event in ISO 8601 format (e.g., YYYY-MM-DDTHH:mm:ss.sssZ)',
    example: '2025-12-25T12:00:00.000Z',
    type: String, // Swagger should list it as a string input
  })
  @IsOptional()
  @IsISO8601({ strict: true })
  @Type(() => Date)
  @IsDate()
  fromDate?: string;

  @ApiPropertyOptional({
    description:
      'The end date of the event in ISO 8601 format (e.g., YYYY-MM-DDTHH:mm:ss.sssZ)',
    example: '2025-12-25T12:00:00.000Z',
    type: String, // Swagger should list it as a string input
  })
  @IsOptional()
  @IsISO8601({ strict: true })
  @Type(() => Date)
  @IsDate()
  toDate?: string;
}
