import { BaseController } from 'src/common/controllers/base.controller';
import { User } from '../entities/user.entity';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../services/user.service';
import { Controller, UseGuards } from '@nestjs/common';
import { UserSearchDto } from '../dto/user-search.dto';

@Controller({ path: '/api/user' })
export class UserController extends BaseController<
  User,
  UserDto,
  UserSearchDto
> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }
}
