import { BaseController } from 'src/common/controllers/base.controller';
import { TaskDto, TaskResp } from '../dto/task.dto';
import { Task } from '../entities/task.entity';
import { Request } from 'express';
import { TaskService } from '../services/task.service';
import {
  Controller,
  Get,
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
import { plainToInstance } from 'class-transformer';

@Controller({ path: 'api/task' })
export class TaskController extends BaseController<
  Task,
  TaskDto,
  TaskSearchDto,
  TaskResp
> {
  constructor(private readonly taskService: TaskService) {
    super(taskService);
  }

  protected transformToResp(entity: Task): TaskResp {
    const data = plainToInstance(TaskResp, entity, {
      excludeExtraneousValues: true,
    });
    console.log(data);
    return data;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(createDto: TaskDto, @Req() req: Request) {
    const user = req['user'];
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.transformToResp(
      await this.taskService.create({
        ...createDto,
        taskOf: user,
        // status: TaskStatus.PENDING,
      }),
    );
  }

  @Get('/pending')
  @UseGuards(JwtAuthGuard)
  async getAll() {
    return this.taskService.findAll({ where: { status: TaskStatus.PENDING } });
  }

  @Patch(':id/complete')
  async completeTask(@Param('id') id: number) {
    const data = await this.taskService.updateStatus(id, TaskStatus.COMPLETED);
    return data && this.transformToResp(data);
  }

  @Patch(':id/in-progress')
  async inProgressTask(@Param('id') id: number) {
    const data = await this.taskService.updateStatus(
      id,
      TaskStatus.IN_PROGRESS,
    );
    return data && this.transformToResp(data);
  }

  @Patch(':id/pending')
  async pendingTask(@Param('id') id: number) {
    const data = await this.taskService.updateStatus(id, TaskStatus.PENDING);
    return data && this.transformToResp(data);
  }
}
