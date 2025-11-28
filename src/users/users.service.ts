import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { hash } from 'bcrypt';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async createUser(user: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.findUserByEmail(user.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await hash(user.password, 10);
    const newUser = this.userRepo.create({
      ...user,
      password: hashedPassword,
    });

    const savedUser = await this.userRepo.save(newUser);
    return new UserResponseDto(savedUser);
  }

  async findUserByEmail(email: string): Promise<UserResponseDto | null> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    return new UserResponseDto(user);
  }
}
