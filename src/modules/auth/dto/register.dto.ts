import { IsStrongPassword } from 'class-validator';
import { RequestDto } from 'src/common/dtos/req.dto';

export class RegisterDto extends RequestDto {
  username: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;

  confirmPassword: string;
}
