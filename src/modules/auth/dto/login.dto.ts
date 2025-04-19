import { NotBlank } from 'src/common/decorators/not-blank.decorator';
import { RequestDto } from 'src/common/dtos/req.dto';

export class LoginDto extends RequestDto {
  @NotBlank({ message: 'username is required' })
  username: string;

  @NotBlank({ message: 'password is required' })
  password: string;
}
