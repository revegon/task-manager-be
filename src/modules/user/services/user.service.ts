import { BaseService } from 'src/common/services/base.service';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOneBy({ username });
  }
}
