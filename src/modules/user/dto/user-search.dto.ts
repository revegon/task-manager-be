import { SearchDto } from 'src/common/dtos/req.dto';
import { UserRole } from '../constants/user-role';

export class UserSearchDto extends SearchDto {
  username?: string;
  role?: UserRole;
}
