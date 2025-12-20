import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ProjectStatus } from 'src/projects/constants';
import { PaginatedResponseDto } from 'src/shared/dto/pagination.dto';

export class TaskResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  projectId: number;

  @ApiProperty()
  @Expose()
  assigneeId: number;

  @ApiProperty({ enum: ProjectStatus })
  @Expose()
  status: ProjectStatus;

  @ApiProperty()
  @Expose()
  priority: number;

  @ApiProperty()
  @Expose()
  dueDate: Date;

  @ApiProperty()
  @Expose()
  deleted: boolean;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}

export class TaskPaginatedResponseDto extends PaginatedResponseDto<TaskResponseDto> {
  @ApiProperty({
    type: [TaskResponseDto], // Explicitly tells Swagger what the array contains
    description: 'Array of task records',
  })
  data: TaskResponseDto[];
}
