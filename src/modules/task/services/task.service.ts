import { BaseService } from 'src/common/services/base.service';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { TaskStatus } from '../constants/task-status';
import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

export class TaskService extends BaseService<Task> {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {
    super(taskRepository);
  }

  async updateStatus(id: number, status: TaskStatus) {
    const task = await this.findOne(id);
    if (!task) {
      throw new BadRequestException('Task does not exist');
    }
    // if (task.status == TaskStatus.COMPLETED) {
    //   if (status == TaskStatus.COMPLETED) {
    //     throw new BadRequestException('Task is already completed');
    //   } else {
    //     throw new BadRequestException(
    //       "Completed Task can't be chnaged to " + status,
    //     );
    //   }
    // } else
    if (task.status == status) {
      throw new BadRequestException('Task is already in ' + status);
    }

    return this.update(id, { status });
  }
}
