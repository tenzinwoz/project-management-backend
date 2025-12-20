import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { CreateProjectDto } from 'src/projects/dto/create-project.dto';
import { ProjectFilterQueryDto } from 'src/projects/dto/project-query.dto';
import {
  ProjectPaginatedResponseDto,
  ProjectResponseDto,
} from 'src/projects/dto/project-response.dto';
import { UpdateProjectMemberDto } from 'src/projects/dto/update-project-member.dto';
import { UpdateProjectDto } from 'src/projects/dto/update-project.dto';

import { ProjectEntity } from 'src/projects/entity/project.entity';
import { generateLinks, generateMeta } from 'src/shared/utils/pagination.utils';
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

    return plainToInstance(ProjectResponseDto, {
      ...project,
      userId: project?.user?.id,
    });
  }

  async getProjectById(id: number) {
    const project = await this.projectRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!project) {
      throw new BadRequestException('Project not found');
    }

    return project;
  }

  async PatchProjectById(
    id: number,
    updateProjectDto: Partial<UpdateProjectDto>,
  ) {
    const project = await this.projectRepo.findOne({
      where: { id },
    });

    if (!project) {
      throw new BadRequestException('Project not found');
    }

    await this.projectRepo.update(id, updateProjectDto);

    const finalProject = await this.projectRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    return finalProject;
  }

  async getProjects(
    projectQueryFilter: ProjectFilterQueryDto,
  ): Promise<ProjectPaginatedResponseDto> {
    const { page, limit, sortOrder, sortBy, status, userId, fromDate, toDate } =
      projectQueryFilter;
    const queryBuilder = this.projectRepo
      .createQueryBuilder('project')
      .leftJoin('project.user', 'user');
    // Apply filters based on ProjectFilterQueryDto
    if (status) {
      queryBuilder.andWhere('project.status = :status', {
        status,
      });
    }
    if (userId) {
      queryBuilder.andWhere('project.userId = :userId', {
        userId,
      });
    }
    if (fromDate) {
      queryBuilder.andWhere('project.createdAt >= :fromDate', {
        fromDate,
      });
    }
    if (toDate) {
      queryBuilder.andWhere('project.createdAt <= :toDate', {
        toDate,
      });
    }

    // Apply sorting
    if (sortBy && sortOrder) {
      queryBuilder.orderBy(`project.${sortBy}`, sortOrder.toUpperCase() as any);
    }

    // Apply pagination
    queryBuilder.skip((page - 1) * limit).take(limit);

    const [projects, total] = await queryBuilder.getManyAndCount();
    console.log(projects, 'projects');
    const meta = generateMeta({
      totalItems: total,
      limit: limit,
      currentPage: page,
      itemCount: projects.length,
    });

    const links = generateLinks({
      baseUrl: '/users', // Your endpoint route
      currentPage: page,
      totalPages: meta.totalPages,
      queryParams: projectQueryFilter, // Pass all original input params
    });

    return {
      data: projects.map((project) =>
        plainToInstance(
          ProjectResponseDto,
          {
            ...project,
            userId: project?.user?.id,
          },
          { excludeExtraneousValues: true },
        ),
      ),
      meta,
      links,
    };
  }

  async updateProjectMembers(
    id: number,
    members: UpdateProjectMemberDto,
  ): Promise<ProjectResponseDto> {
    const project = await this.projectRepo.findOne({
      where: { id },
    });
    if (!project) {
      throw new BadRequestException('Project not found');
    }

    const existingMembers = project.members || [];
    console.log(existingMembers, 'existing Member');

    let newMembers = existingMembers;

    if (!!members.remove.length) {
      newMembers = newMembers.filter(
        (memberId) => !members.remove.includes(memberId),
      );
    }

    if (!!members.add.length) {
      newMembers = Array.from(new Set([...newMembers, ...members.add]));
    }

    project.members = newMembers;

    const updatedProject = await this.projectRepo.save(project);

    return plainToInstance(ProjectResponseDto, {
      ...updatedProject,
      userId: updatedProject?.user?.id,
    });
  }

  async deleteProject(id: number): Promise<void> {
    const project = await this.projectRepo.findOne({ where: { id } });
    if (!project) {
      throw new BadRequestException('Project not found');
    }

    await this.projectRepo.update(id, {
      deleted: true,
    });
  }
}
