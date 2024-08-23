import { IsEnum, IsOptional, IsString } from 'class-validator'
import { TaskEntity, TaskStatus } from '../task.entity'

export class UpdateTaskDto
  implements Pick<Partial<TaskEntity>, 'name' | 'status' | 'description'>
{
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsEnum(TaskStatus)
  status?: TaskStatus
}
