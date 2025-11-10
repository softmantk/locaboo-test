import { TaskFilters, TaskRepositoryPort } from '../ports/task.repository.port';
import { PrismaService } from '../../../shared/infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TaskEntity, TaskProps } from '../domain/tasks.entity';
import {
  PaginatedResult,
  PaginationParams,
} from '../../../shared/types/pagination.types';
import { TaskMapper } from './task.mapper';

@Injectable()
export class TaskRepository implements TaskRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(task: TaskProps): Promise<TaskEntity> {
    const newTask = await this.prisma.task.create({
      data: task,
    });

    return TaskEntity.fromPersistence(newTask);
  }

  async findById(id: number): Promise<TaskEntity | null> {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        assignee: true,
        reporter: true,
      },
    });
    if (task) {
      return TaskEntity.fromPersistence(task);
    }
    return null;
  }

  async patch(id: number, data: Partial<TaskProps>): Promise<TaskEntity> {
    const resp = await this.prisma.task.update({
      where: { id },
      data,
      include: {
        assignee: true,
      },
    });
    console.log('patch: resp', resp);
    return TaskEntity.fromPersistence(resp);
  }

  async findAll(
    filters?: TaskFilters,
    pagination?: PaginationParams,
  ): Promise<PaginatedResult<TaskEntity>> {
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const skip = (page - 1) * limit;

    const where: Record<string, any> = filters ?? {};

    const orderBy: Record<string, any> = {};
    console.log('findAll: where', where);

    if (pagination?.sortBy) {
      orderBy[pagination.sortBy] = pagination.sortOrder || 'desc';
    } else {
      orderBy.createdAt = 'desc';
    }
    console.log('findAll: orderBy', orderBy);

    const [rows, total] = await Promise.all([
      this.prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      this.prisma.task.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: rows.map(TaskMapper.toDomain),
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }

  async delete(id: number): Promise<{ deleted: boolean }> {
    await this.prisma.task.delete({ where: { id } });
    return { deleted: true };
  }
}
