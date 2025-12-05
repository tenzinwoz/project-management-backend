import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { CreateProjectDto } from 'src/projects/dto/create-project.dto';
import { ProjectResponseDto } from 'src/projects/dto/project-response.dto';
import { ProjectEntity } from 'src/projects/entity/project.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepo: Repository<ProjectEntity>,

    private readonly usersService: UsersService,
  ) {}
  async createProject(
    createProjectDto: CreateProjectDto,
  ): Promise<ProjectResponseDto> {
    const user = await this.usersService.findUserById(createProjectDto.userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }
    const project = await this.projectRepo.save({
      ...createProjectDto,
      user: {
        id: createProjectDto.userId,
      },
    });

    return plainToInstance(ProjectResponseDto, project);
  }

  async getProjectById(id: number): Promise<any> {
    const project = await this.projectRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!project) {
      throw new BadRequestException('Project not found');
    }
    return plainToInstance(ProjectResponseDto, project);
  }
}
