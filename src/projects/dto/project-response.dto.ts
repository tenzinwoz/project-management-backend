import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { ProjectStatus } from 'src/projects/constants';

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
  @Transform(({ obj }) => obj.user?.id)
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
