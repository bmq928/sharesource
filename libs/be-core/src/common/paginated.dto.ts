import { Expose, Type } from 'class-transformer'
import { IsEnum, IsInt, IsNumber, IsOptional, Max, Min } from 'class-validator'

/* eslint-disable @typescript-eslint/no-inferrable-types */
export enum SortEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export class PaginatedQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsNumber()
  @IsOptional()
  page: number = 1

  @Type(() => Number)
  @IsInt()
  @Max(100)
  @Min(1)
  @IsOptional()
  perPage: number = 10

  @IsEnum(SortEnum)
  @IsOptional()
  sort: SortEnum = SortEnum.DESC

  @IsEnum(['createdAt', 'updatedAt'])
  @IsOptional()
  sortBy: string = 'createdAt'
}

export class PageInfo implements PaginatedQueryDto {
  @Expose()
  page: number

  @Expose()
  perPage: number

  @Expose()
  sort: SortEnum

  @Expose()
  sortBy: string

  @Expose()
  total: number
}

export abstract class PaginatedResponse<T> {
  @Expose()
  pageInfo: PageInfo

  @Expose()
  abstract data: T[]
}
