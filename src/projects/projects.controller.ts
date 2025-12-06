import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { CreateProjectDto } from 'src/projects/dto/create-project.dto';
import { ProjectFilterQueryDto } from 'src/projects/dto/project-query.dto';
import {
  ProjectPaginatedResponseDto,
  ProjectResponseDto,
} from 'src/projects/dto/project-response.dto';
import { UpdateProjectDto } from 'src/projects/dto/update-project.dto';

import { ProjectsService } from 'src/projects/projects.service';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({ summary: 'Create a new project' })
  @ApiCreatedResponse({
    description: 'The project has been successfully created.',
    type: ProjectResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.createProject(createProjectDto);
  }

  @ApiOperation({ summary: 'Get project by ID' })
  @ApiAcceptedResponse({
    description: 'The project has been successfully retrieved.',
    type: ProjectResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid project ID.' })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async getProjectById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProjectResponseDto> {
    const project = await this.projectsService.getProjectById(id);

    // Removes user relation object
    const cleanedProject = plainToInstance(ProjectResponseDto, project, {
      excludeExtraneousValues: true,
    });

    // add userId field
    return { ...cleanedProject, userId: project.user.id };
  }

  @ApiOperation({ summary: 'Update project by ID' })
  @ApiAcceptedResponse({
    description: 'The project has been successfully updated.',
    type: ProjectResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid project ID or input data.' })
  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  async PatchProjectById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    const project = await this.projectsService.PatchProjectById(
      id,
      updateProjectDto,
    );
    // Removes user relation object
    const cleanedProject = plainToInstance(ProjectResponseDto, project, {
      excludeExtraneousValues: true,
    });

    // add userId field
    return { ...cleanedProject, userId: project.user.id };
  }

  @ApiOperation({ summary: 'Get paginated projects' })
  @ApiAcceptedResponse({
    description: 'The projects have been successfully retrieved.',
    // type: [ProjectResponseDto],
  })
  @ApiBadRequestResponse({ description: 'Invalid query parameters.' })
  @HttpCode(HttpStatus.OK)
  @Get()
  getProjects(
    @Query() projectQueryFilter: ProjectFilterQueryDto,
  ): Promise<ProjectPaginatedResponseDto> {
    return this.projectsService.getProjects(projectQueryFilter);
  }
}
