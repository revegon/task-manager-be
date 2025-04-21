import { SearchDto } from 'src/common/dtos/req.dto';
import { TaskStatus } from '../constants/task-status';

export class TaskSearchDto extends SearchDto {
  title?: string;
  status?: TaskStatus;
}
