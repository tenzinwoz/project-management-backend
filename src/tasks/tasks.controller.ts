import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
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
} from '@nestjs/common';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { TasksService } from 'src/tasks/tasks.service';
import { TaskResponseDto } from 'src/tasks/dto/task-response.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @ApiOperation({ summary: 'Create a new task' })
  @ApiCreatedResponse({
    description: 'The task has been successfully created.',
    type: TaskResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.tasksService.createTask(createTaskDto);
  }

  @ApiOperation({ summary: 'Update an existing task' })
  @Patch(':id')
  @ApiCreatedResponse({
    description: 'The task has been successfully updated.',
    type: TaskResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @HttpCode(HttpStatus.OK)
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiCreatedResponse({
    description: 'The task has been successfully retrieved.',
    type: TaskResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getTaskById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TaskResponseDto> {
    return this.tasksService.getTaskById(id);
  }
}
