import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiPropertyOptional({
    description: 'Indicates whether the task is deleted',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  deleted?: boolean;
}
