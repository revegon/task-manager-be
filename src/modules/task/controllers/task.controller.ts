import { BaseController } from 'src/common/controllers/base.controller';
import { TaskDto } from '../dto/task.dto';
import { Task } from '../entities/task.entity';
import { Request } from 'express';
import { TaskService } from '../services/task.service';
import {
  Controller,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { TaskStatus } from '../constants/task-status';
import { TaskSearchDto } from '../dto/task-search.dto';

@Controller({ path: 'api/task' })
export class TaskController extends BaseController<
  Task,
  TaskDto,
  TaskSearchDto
> {
  constructor(private readonly taskService: TaskService) {
    super(taskService);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(createDto: TaskDto, @Req() req: Request): Promise<Task> {
    const user = req['user'];
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.taskService.create({
      ...createDto,
      taskOf: user,
      status: TaskStatus.PENDING,
    });
  }

  @Patch(':id/complete')
  async completeTask(@Param('id') id: number) {
    return this.taskService.updateStatus(id, TaskStatus.COMPLETED);
  }

  @Patch(':id/in-progress')
  async inProgressTask(@Param('id') id: number) {
    return this.taskService.updateStatus(id, TaskStatus.IN_PROGRESS);
  }

  @Patch(':id/pending')
  async pendingTask(@Param('id') id: number) {
    return this.taskService.updateStatus(id, TaskStatus.PENDING);
  }
}
