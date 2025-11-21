import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

@Injectable()
export class AuthService {
  createUser(createUserDto: CreateUserDto) {
    return {
      ...createUserDto,
      id: 'user_12345',
      createdAt: '2025-01-01T10:00:00Z',
    };
  }
}
