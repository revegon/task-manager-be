import { Column, Entity, OneToMany } from 'typeorm';
import { UserRole } from '../constants/user-role';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Task } from 'src/modules/task/entities/task.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.REGULAR })
  role: UserRole;

  @OneToMany(() => Task, (task) => task.taskOf)
  tasks: Promise<Task[]>;
}
