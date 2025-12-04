import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { hash } from 'bcrypt';
import {
  UserPaginatedResponseDto,
  UserResponseDto,
} from 'src/users/dto/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { UserFilterDto } from 'src/users/dto/user-filter.dto';
import { SORT } from 'src/shared/dto/base-query.dto';
import { generateLinks, generateMeta } from 'src/shared/utils/pagination.utils';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async createUser(user: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.findUserByEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await hash(user.password, 10);
    const newUser = this.userRepo.create({
      ...user,
      password: hashedPassword,
    });

    const savedUser = await this.userRepo.save(newUser);
    return plainToInstance(UserResponseDto, savedUser);
  }

  async findUserByEmail(email: string): Promise<UserResponseDto | null> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    return user;
  }

  async findUserById(id: number): Promise<UserResponseDto | null> {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return plainToInstance(UserResponseDto, user);
  }

  async getUsers(params: UserFilterDto): Promise<UserPaginatedResponseDto> {
    const { page, limit, sortBy, sortOrder, search, role, isActive } = params;

    const userQuery = this.userRepo.createQueryBuilder('user');

    // 1. Apply primary filters (role and isActive)
    if (role) {
      // Use .andWhere() here because it intelligently adds 'AND' if a .where() was already called,
      // or acts as the first .where() if not. It makes the code flow cleaner.
      userQuery.andWhere('user.role = :role', { role });
    }

    if (isActive !== undefined) {
      userQuery.andWhere('user.isActive = :isActive', { isActive });
    }

    // 2. Apply search filter (if present)
    if (search) {
      // Use a group of parentheses for the LIKE conditions to ensure proper SQL precedence
      userQuery.andWhere(
        '(user.firstName LIKE :search OR user.lastName LIKE :search OR user.email LIKE :search)',
        { search: `%${search}%` },
      );
    }

    // 3. Apply sorting logic
    if (sortBy) {
      const order = sortOrder === SORT.DESC ? 'DESC' : 'ASC';
      userQuery.orderBy(`user.${sortBy}`, order);
    } else {
      // Always good practice to have a default sort for stable results/pagination
      userQuery.orderBy('user.createdAt', 'DESC');
    }

    userQuery.skip((page - 1) * limit).take(limit);

    const [users, total] = await userQuery.getManyAndCount();

    const meta = generateMeta({
      totalItems: total,
      limit: limit,
      currentPage: page,
      itemCount: users.length,
    });

    const links = generateLinks({
      baseUrl: '/users', // Your endpoint route
      currentPage: page,
      totalPages: meta.totalPages,
      queryParams: params, // Pass all original input params
    });

    return {
      data: users.map((user) => plainToInstance(UserResponseDto, user)),
      meta,
      links,
    };
  }

  async patchUser(id: number, data: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, data);

    const updatedUser = await this.userRepo.save(user);
    return plainToInstance(UserResponseDto, updatedUser);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepo.update(id, {
      isActive: false,
    });
  }

  async restoreUser(id: number): Promise<void> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepo.update(id, {
      isActive: true,
    });
  }
}
