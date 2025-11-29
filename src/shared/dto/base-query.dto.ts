import { IsOptional, IsInt, Min, Max, IsString, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 25;
export enum SORT {
  ASC = 'asc',
  DESC = 'desc',
}

export class BaseQueryDto {
  @ApiProperty({
    required: false,
    description: 'Page number for pagination (default is 1)',
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = DEFAULT_PAGE; // Default page 1

  @ApiProperty({
    required: false,
    description: 'Number of items per page for pagination (default is 25)',
    example: 25,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100) // Set a sensible max limit
  limit?: number = DEFAULT_LIMIT; // Default limit 10

  @ApiProperty({
    required: false,
    description: 'Search term to filter results',
    example: 'john',
  })
  @IsOptional()
  @IsString()
  search?: string;

  // You might also add sorting fields here
  @ApiProperty({
    required: false,
    description: 'Field to sort by',
    example: 'createdAt',
  })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiProperty({
    required: false,
    description: 'Sort order: asc or desc (default is asc)',
    example: 'asc',
  })
  @IsOptional()
  @IsEnum(SORT)
  sortOrder?: SORT = SORT.ASC;
}
