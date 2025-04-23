import { Expose } from 'class-transformer';
import { RequestDto, RespDto } from 'src/common/dtos/common.dto';

export class UserDto extends RequestDto {
  username: string;
  password: string;
  confirmPassword: string;
}

export class UserRespDto extends RespDto {
  @Expose()
  id: number;
  @Expose()
  username: string;
}
