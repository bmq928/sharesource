import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { TaskEntity, TaskStatus } from '../task.entity'

export class CreateTaskDto implements Partial<TaskEntity> {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  description: string

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus
}
