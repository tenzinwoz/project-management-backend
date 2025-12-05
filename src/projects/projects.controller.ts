import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProjectDto } from 'src/projects/dto/create-project.dto';
import { ProjectResponseDto } from 'src/projects/dto/project-response.dto';

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
  getProjectById(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.getProjectById(id);
  }
}
