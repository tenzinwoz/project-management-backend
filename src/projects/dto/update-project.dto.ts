import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from 'src/projects/dto/create-project.dto';

export class UpdateProjectDto extends PartialType(
  OmitType(CreateProjectDto, ['userId', 'members', 'status']),
) {}
