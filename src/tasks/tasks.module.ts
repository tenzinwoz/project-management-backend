import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from 'src/tasks/entity/task.entity';
import { ProjectEntity } from 'src/projects/entity/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, ProjectEntity])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
