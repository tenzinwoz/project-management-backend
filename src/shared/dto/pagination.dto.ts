// src/common/dto/pagination.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * Metadata for the pagination response.
 */
export class PaginationMetaDto {
  @ApiProperty({
    example: 142,
    description: 'Total number of items found across all pages',
  })
  totalItems: number;

  @ApiProperty({
    example: 10,
    description: 'Number of items returned in this specific page',
  })
  itemCount: number;

  @ApiProperty({ example: 10, description: 'Maximum number of items per page' })
  itemsPerPage: number;

  @ApiProperty({ example: 15, description: 'Total number of available pages' })
  totalPages: number;

  @ApiProperty({
    example: 1,
    description: 'The current page number being viewed',
  })
  currentPage: number;
}

/**
 * Links for navigating the paginated results (HATEOAS).
 */
export class PaginationLinksDto {
  @ApiProperty({
    example: '?page=1&limit=10',
    description: 'Link to the first page',
  })
  first: string;

  @ApiProperty({
    example: null,
    description: 'Link to the previous page',
    nullable: true,
  })
  previous: string | null;

  @ApiProperty({
    example: '?page=2&limit=10',
    description: 'Link to the next page',
    nullable: true,
  })
  next: string | null;

  @ApiProperty({
    example: '?page=15&limit=10',
    description: 'Link to the last page',
  })
  last: string;
}

/**
 * The generic wrapper DTO for all paginated responses.
 * @template T The type of data contained within the 'data' array.
 */
export class PaginatedResponseDto<T> {
  // We use @ApiProperty here but rely on sub-classes to define the 'type' of T for Swagger
  data: T[];

  @ApiProperty({ type: PaginationMetaDto })
  @Type(() => PaginationMetaDto)
  meta: PaginationMetaDto;

  @ApiProperty({ type: PaginationLinksDto })
  @Type(() => PaginationLinksDto)
  links: PaginationLinksDto;
}
