import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TaskPriority, TaskStatus } from 'src/tasks/constants';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The name of the task',
    example: 'Design Homepage',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    description: 'A brief description of the task',
    example: 'Designing the homepage layout',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The ID of the project this task belongs to',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  projectId: number;

  @ApiPropertyOptional({
    description: 'The ID of the user assigned to the task',
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  assigneeId: number;

  @ApiPropertyOptional({
    description: 'The status of the task',
    example: TaskStatus.ACTIVE,
    enum: TaskStatus,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional({
    description: 'The priority of the task',
    example: TaskPriority.MEDIUM,
    enum: TaskPriority,
  })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @ApiPropertyOptional({
    description: 'The due date of the task',
    example: '2024-12-31T23:59:59.999Z',
  })
  @IsOptional()
  @IsString()
  dueDate?: string;
}
