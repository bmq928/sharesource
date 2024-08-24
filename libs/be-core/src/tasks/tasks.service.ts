import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IdDto, PaginatedQueryDto } from '../common'
import { CreateTaskDto } from './dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { TaskEntity } from './task.entity'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepo: Repository<TaskEntity>
  ) {}

  find(
    idUser: string,
    dto: PaginatedQueryDto
  ): Promise<[TaskEntity[], number]> {
    return this.tasksRepo.findAndCount({
      where: { createdBy: { id: idUser } },
      take: dto.perPage,
      skip: (dto.page - 1) * dto.perPage,
      order: { [dto.sortBy]: dto.sort },
    })
  }

  create(idUser: string, dto: CreateTaskDto): Promise<TaskEntity> {
    return this.tasksRepo.save(
      this.tasksRepo.create({
        ...dto,
        createdBy: { id: idUser },
      })
    )
  }

  async update(
    idUser: string,
    { id: idTask }: IdDto,
    dto: UpdateTaskDto
  ): Promise<TaskEntity> {
    const founded = await this.tasksRepo.findOneBy({
      id: idTask,
      createdBy: { id: idUser },
    })
    if (!founded)
      throw new NotFoundException(`task with id ${idTask} not found`)

    if (Object.values(dto).every((v) => v === null || v === undefined))
      throw new BadRequestException('nothing to update')

    const updateBody = Object.fromEntries(
      Object.entries(dto).filter(([, val]) => val !== null && val !== undefined)
    )
    return this.tasksRepo.save(
      this.tasksRepo.create({
        ...updateBody,
        id: idTask,
        createdBy: { id: idUser },
      })
    )
  }

  async del(idUser: string, { id: idTask }: IdDto): Promise<void> {
    const founded = await this.tasksRepo.findOneBy({
      id: idTask,
      createdBy: { id: idUser },
    })
    if (!founded) return
    await this.tasksRepo.remove(founded)
  }
}
