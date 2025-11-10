import { TaskEntity } from '../domain/tasks.entity';
import { TaskModel as PrismaTask } from '../../../../generated/prisma/models/Task';

export class TaskMapper {
  static toDomain(prismaTask: PrismaTask): TaskEntity {
    return TaskEntity.fromPersistence({
      id: prismaTask.id,
      title: prismaTask.title,
      description: prismaTask.description,
      priority: prismaTask.priority,
      status: prismaTask.status,
      assigneeId: prismaTask.assigneeId,
      reporterId: prismaTask.reporterId,
      createdAt: prismaTask.createdAt,
      updatedAt: prismaTask.updatedAt,
    });
  }

  static toPersistence(taskEntity: TaskEntity): PrismaTask {
    const { data } = taskEntity;
    return {
      id: data.id,
      title: data.title,
      description: data.description ?? null,
      priority: data.priority ?? null,
      status: data.status ?? null,
      assigneeId: data.assigneeId ?? null,
      reporterId: data.reporterId ?? null,
      createdAt: data.createdAt!,
      updatedAt: data.updatedAt!,
    } as PrismaTask;
  }
}
