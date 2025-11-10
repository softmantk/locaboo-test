import { Inject, Injectable } from '@nestjs/common';
import { TaskRepositoryPort } from '../ports/task.repository.port';
import { TaskEntity, TaskProps } from '../domain/tasks.entity';
import { TaskNotFoundError } from '../domain/task.errors';

@Injectable()
export class PatchTaskUsercase {
  constructor(
    @Inject('TaskRepositoryPort')
    private readonly taskRepository: TaskRepositoryPort,
  ) {}

  async execute(id: number, data: Partial<TaskProps>): Promise<TaskEntity> {
    const task = await this.taskRepository.findById(id);
    console.log('execute: task', task);

    if (!task) throw new TaskNotFoundError(id);

    const resp = await this.taskRepository.patch(id, data);
    console.log('execute: resp', resp);

    return resp;
  }
}
