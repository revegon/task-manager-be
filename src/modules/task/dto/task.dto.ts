import { NotBlank } from 'src/common/decorators/not-blank.decorator';
import { RequestDto, RespDto } from 'src/common/dtos/common.dto';
import { TaskStatus } from '../constants/task-status';
import { Expose } from 'class-transformer';

export class TaskDto extends RequestDto {
  @NotBlank({ message: 'Title is required' })
  title: string;
  description: string;
  status: TaskStatus = TaskStatus.PENDING;
}

export class TaskResp extends RespDto {
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  description: string;
  @Expose()
  status: TaskStatus;
}
