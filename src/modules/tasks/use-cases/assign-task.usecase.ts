import { Inject, Injectable } from '@nestjs/common';
import { type TaskRepositoryPort } from '../ports/task.repository.port';
import { NewTaskProps, TaskEntity, TaskProps } from '../domain/tasks.entity';
import { UserRepositoryPort } from '../../users/ports/user.repository.port';
import { TaskNotFoundError, UserNotFoundError } from '../domain/task.errors';

@Injectable()
export class AssignTaskUseCase {
  constructor(
    @Inject('TaskRepositoryPort')
    private readonly taskRepositoryPort: TaskRepositoryPort,

    @Inject('UserRepositoryPort')
    private readonly userRepositoryPort: UserRepositoryPort,
  ) {}

  async execute(taskId: number, userId: number): Promise<TaskEntity> {
    const [task, user] = await Promise.all([
      this.taskRepositoryPort.findById(taskId),
      this.userRepositoryPort.findById(userId),
    ]);
    if (!task) {
      throw new TaskNotFoundError(taskId);
    }
    if (!user) {
      throw new UserNotFoundError(userId);
    }

    task.assignUser(userId);
    console.log('---->execute: task.data', task.data);
    const response = await this.taskRepositoryPort.patch(taskId, {
      assigneeId: task.data.assigneeId,
    });
    console.log('AssignTaskUseCase:execute: response', response);
    return response;
  }
}
