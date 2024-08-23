import { Column, Entity, OneToMany } from 'typeorm'
import { EntityPostgres } from '../common'
import { TaskEntity } from '../tasks/task.entity'

@Entity()
export class UserEntity extends EntityPostgres {
  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @OneToMany(() => TaskEntity, (t) => t.createdBy, {
    createForeignKeyConstraints: false,
  })
  tasks?: Partial<TaskEntity>[]
}
