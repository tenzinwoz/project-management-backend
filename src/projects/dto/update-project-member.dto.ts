import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class UpdateProjectMemberDto {
  @ApiProperty({
    description: 'The IDs of the members to add to the project',
    example: [1, 2, 3],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  add: number[];

  @ApiProperty({
    description: 'The IDs of the members to remove from the project',
    example: [1, 2, 3],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  remove: number[];
}
