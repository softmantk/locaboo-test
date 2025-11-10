import { Inject, Injectable } from '@nestjs/common';
import { TaskRepositoryPort, TaskFilters } from '../ports/task.repository.port';
import { TaskEntity, TaskProps } from '../domain/tasks.entity';
import {
  PaginatedResult,
  PaginationParams,
} from '../../../shared/types/pagination.types';

@Injectable()
export class FindTasksUsecase {
  constructor(
    @Inject('TaskRepositoryPort')
    private readonly taskRepository: TaskRepositoryPort,
  ) {}

  async execute(
    filters?: TaskFilters,
    pagination?: PaginationParams,
  ): Promise<PaginatedResult<TaskEntity>> {
    return this.taskRepository.findAll(filters, pagination);
  }
}
