import { Expose, Type } from 'class-transformer'
import { PaginatedResponse } from '../common'
import { UserResponse } from '../users'
import { TaskEntity, TaskStatus } from './task.entity'

export class TaskResponse implements TaskEntity {
  @Expose()
  description: string

  @Expose()
  name: string

  @Expose()
  status: TaskStatus

  @Expose()
  @Type(() => UserResponse)
  createdBy?: UserResponse

  @Expose()
  id: string

  @Expose()
  createdAt: Date

  @Expose()
  updatedAt: Date
}

export class TaskPaginatedResponse extends PaginatedResponse<TaskResponse> {
  @Expose()
  @Type(() => TaskResponse)
  override data: TaskResponse[]
}
