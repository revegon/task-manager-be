import { NotBlank } from 'src/common/decorators/not-blank.decorator';
import { RequestDto } from 'src/common/dtos/req.dto';

export class TaskDto extends RequestDto {
  @NotBlank({ message: 'Title is required' })
  title: string;
  description: string;
}
