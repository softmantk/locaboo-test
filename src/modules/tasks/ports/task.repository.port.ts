import { NewTaskProps, TaskEntity, TaskProps } from '../domain/tasks.entity';
import {
  PaginatedResult,
  PaginationParams,
} from '../../../shared/types/pagination.types';

export interface TaskFilters {
  status?: string;
  priority?: string;
  assigneeId?: number;
  reporterId?: number;
}

export interface TaskRepositoryPort {
  create(task: NewTaskProps): Promise<TaskEntity>;
  findById(id: number): Promise<TaskEntity | null>;
  patch(id: number, data: Partial<TaskProps>): Promise<TaskEntity>;
  findAll(
    filters?: TaskFilters,
    pagination?: PaginationParams,
  ): Promise<PaginatedResult<TaskEntity>>;
  delete(id: number): Promise<{ deleted: boolean }>;
}
