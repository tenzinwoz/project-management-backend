import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ProjectStatus } from 'src/projects/constants';
import { PaginatedResponseDto } from 'src/shared/dto/pagination.dto';

export class ProjectResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  userId: number;

  @ApiProperty({
    type: [Number],
  })
  @Expose()
  members: number[];

  @ApiProperty()
  @Expose()
  status: ProjectStatus;
}

export class ProjectPaginatedResponseDto extends PaginatedResponseDto<ProjectResponseDto> {
  @ApiProperty({
    type: [ProjectResponseDto], // Explicitly tells Swagger what the array contains
    description: 'Array of project records',
  })
  data: ProjectResponseDto[];
}
