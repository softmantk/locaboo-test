import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import {
  TASK_PRIORITY,
  TASK_STATUS,
  TaskPriority,
  TaskStatus,
} from '../domain/tasks.entity';
import { PaginationQueryDto } from '../../../shared/dto/pagination-query.dto';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsIn(Object.values(TASK_PRIORITY))
  priority?: TaskPriority;

  @IsOptional()
  @IsIn(Object.values(TASK_STATUS))
  status?: TaskStatus;

  @IsOptional()
  @IsNumber()
  assigneeId?: number;

  @IsOptional()
  @IsNumber()
  reporterId?: number;
}
export class UpdateTaskDto extends PartialType(CreateTaskDto) {}

export class FindTasksQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsIn(['id', 'title', 'createdAt', 'updatedAt', 'priority', 'status'])
  sortBy?: string = 'createdAt';

  @IsOptional()
  @IsIn([...TASK_STATUS])
  status?: TaskStatus;

  @IsOptional()
  @IsIn([...TASK_PRIORITY])
  priority?: TaskPriority;

  @IsOptional()
  assigneeId?: number;

  @IsOptional()
  reporterId?: number;
}

export class assignTaskParamDto {
  @Type(() => Number)
  @IsInt()
  taskId: number;

  @Type(() => Number)
  @IsInt()
  userId: number;
}
