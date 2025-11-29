import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { PaginatedResponseDto } from 'src/shared/dto/pagination.dto';
import { UserRole } from 'src/users/constants';

export class UserResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  firstName: string;

  @ApiProperty()
  @Expose()
  lastName: string;

  @Exclude()
  password: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  @ApiProperty({
    description: 'The role assigned to the user',
    example: UserRole.MEMBER,
    enum: UserRole,
  })
  @Expose()
  role: UserRole;
}

export class UserPaginatedResponseDto extends PaginatedResponseDto<UserResponseDto> {
  @ApiProperty({
    type: [UserResponseDto], // Explicitly tells Swagger what the array contains
    description: 'Array of user records',
  })
  data: UserResponseDto[];
}
