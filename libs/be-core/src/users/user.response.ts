import { Exclude, Expose, Type } from 'class-transformer'
import { PaginatedResponse } from '../common'
import { TaskResponse } from '../tasks/tasks.response'
import { UserEntity } from './user.entity'

export class UserResponse implements UserEntity {
  id: string
  email: string

  createdAt: Date
  updatedAt: Date

  @Exclude()
  password: string

  @Expose()
  @Type(() => TaskResponse)
  tasks: TaskResponse[]
}

export class UserPaginatedResponse extends PaginatedResponse<UserResponse> {
  @Type(() => UserResponse)
  override data: UserResponse[]
}

export class UserAuthTokenResponse {
  accessToken: string
}
