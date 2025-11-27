import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UserEntity } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async createUser(user: CreateUserDto) {
    const existingUser = await this.userRepo.findOne({
      where: { email: user.email },
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const newUser = this.userRepo.create({
      ...user,
    });

    return this.userRepo.save(newUser);
  }

  async loginUser(userDto: LoginUserDto) {
    const user = await this.userRepo.findOne({
      where: { email: userDto.email },
    });
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    // In a real application, you should hash and compare passwords securely
    if (user.password !== userDto.password) {
      throw new BadRequestException('Invalid email or password');
    }

    return user;
  }
}
