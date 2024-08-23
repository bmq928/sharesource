import { IsNotEmpty, IsString } from 'class-validator'
import { TaskEntity } from '../task.entity'

export class CreateTaskDto implements Pick<TaskEntity, 'name'> {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  description: string
}
