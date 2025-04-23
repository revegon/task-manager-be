import { BaseController } from 'src/common/controllers/base.controller';
import { User } from '../entities/user.entity';
import { UserDto, UserRespDto } from '../dto/user.dto';
import { UserService } from '../services/user.service';
import { Controller, UseGuards } from '@nestjs/common';
import { UserSearchDto } from '../dto/user-search.dto';
import { plainToInstance } from 'class-transformer';

@Controller({ path: '/api/user' })
export class UserController extends BaseController<
  User,
  UserDto,
  UserSearchDto,
  UserRespDto
> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }

  protected transformToResp(entity: User): UserRespDto {
    return plainToInstance(UserRespDto, entity, {
      excludeExtraneousValues: true,
    });
  }
}
