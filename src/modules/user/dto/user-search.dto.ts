import { SearchDto } from 'src/common/dtos/common.dto';
import { UserRole } from '../constants/user-role';

export class UserSearchDto extends SearchDto {
  username?: string;
  role?: UserRole;
}
