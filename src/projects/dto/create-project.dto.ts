import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProjectStatus } from 'src/projects/constants';

export class CreateProjectDto {
  @ApiProperty({
    description: 'The name of the project',
    example: 'New Website Development',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'A brief description of the project',
    example: 'Development of a new company website',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The ID of the user creating the project',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiPropertyOptional({
    description: 'The IDs of the members involved in the project',
    example: [1, 2, 3],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  members: number[];

  @IsEnum(ProjectStatus)
  @IsNotEmpty()
  status: ProjectStatus;
}
