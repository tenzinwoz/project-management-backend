import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { ProjectEntity } from 'src/projects/entity/project.entity';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { TaskResponseDto } from 'src/tasks/dto/task-response.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { TaskEntity } from 'src/tasks/entity/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepo: Repository<TaskEntity>,

    @InjectRepository(ProjectEntity)
    private projectRepo: Repository<ProjectEntity>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const project = await this.projectRepo.findOne({
      where: { id: createTaskDto.projectId },
    });

    if (!project) {
      throw new BadRequestException('Invalid project ID provided.');
    }

    const task = this.taskRepo.create(createTaskDto);
    const savedTask = await this.taskRepo.save(task);
    return plainToInstance(TaskResponseDto, savedTask);
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepo.findOne({ where: { id } });
    if (!task) {
      throw new BadRequestException('Task not found.');
    }

    Object.assign(task, updateTaskDto);
    const updatedTask = await this.taskRepo.save(task);
    return plainToInstance(TaskResponseDto, updatedTask);
  }

  async getTaskById(id: number) {
    const task = await this.taskRepo.findOne({ where: { id } });
    if (!task) {
      throw new BadRequestException('Task not found.');
    }
    return plainToInstance(TaskResponseDto, task);
  }
}
