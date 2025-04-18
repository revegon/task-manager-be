import { BaseController } from 'src/common/controllers/base.controller';
import { User } from '../entities/user.entity';
import { UserDto } from '../dto/user-dto';
import { UserService } from '../services/user.service';
import { Controller } from '@nestjs/common';

@Controller({ path: '/api/user' })
export class UserController extends BaseController<User, UserDto> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }
}
