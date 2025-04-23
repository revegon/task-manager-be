import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TaskStatus } from '../constants/task-status';
import { User } from 'src/modules/user/entities/user.entity';

@Entity({ name: 'tasks' })
export class Task extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  taskOf: Promise<User>;
}
