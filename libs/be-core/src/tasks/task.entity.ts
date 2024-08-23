import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { EntityPostgres } from '../common'
import { UserEntity } from '../users/user.entity'

export enum TaskStatus {
  Completed = 'completed',
  Pending = 'pending',
}

@Entity()
export class TaskEntity extends EntityPostgres {
  @Column()
  name: string

  @Column()
  description: string

  @Column({ enum: TaskStatus, default: TaskStatus.Pending })
  status: TaskStatus = TaskStatus.Pending

  @ManyToOne(() => UserEntity, (u) => u.tasks, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  createdBy?: UserEntity
}
