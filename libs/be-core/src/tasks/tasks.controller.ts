import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { plainToInstance } from 'class-transformer'
import { AuthGuard, AuthUserId, IdDto, PaginatedQueryDto } from '../common'
import { CreateTaskDto } from './dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { TaskPaginatedResponse, TaskResponse } from './tasks.response'
import { TasksService } from './tasks.service'

@UseGuards(AuthGuard)
@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  find(
    @Query() q: PaginatedQueryDto,
    @AuthUserId() idUser: string
  ): Promise<TaskPaginatedResponse> {
    return this.tasksService.find(idUser, q).then(([entities, total]) =>
      plainToInstance(
        TaskPaginatedResponse,
        {
          data: entities,
          pageInfo: { total, ...q },
        },
        { excludeExtraneousValues: true }
      )
    )
  }

  @Post()
  create(
    @Body() dto: CreateTaskDto,
    @AuthUserId() idUser: string
  ): Promise<TaskResponse> {
    return this.tasksService
      .create(idUser, dto)
      .then((entity) =>
        plainToInstance(TaskResponse, entity, { excludeExtraneousValues: true })
      )
  }

  @Put(':id')
  update(
    @Param() param: IdDto,
    @Body() body: UpdateTaskDto,
    @AuthUserId() idUser: string
  ): Promise<TaskResponse> {
    return this.tasksService
      .update(idUser, param, body)
      .then((entity) =>
        plainToInstance(TaskResponse, entity, { excludeExtraneousValues: true })
      )
  }

  @HttpCode(204)
  @Delete(':id')
  del(@Param() param: IdDto, @AuthUserId() idUser: string): Promise<void> {
    return this.tasksService.del(idUser, param)
  }
}
