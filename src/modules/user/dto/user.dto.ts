import { RequestDto } from 'src/common/dtos/req.dto';

export class UserDto extends RequestDto {
  username: string;
  password: string;
  confirmPassword: string;
}
