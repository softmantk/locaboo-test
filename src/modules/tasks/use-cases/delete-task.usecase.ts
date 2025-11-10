import { Inject, Injectable } from '@nestjs/common';
import { TaskRepositoryPort } from '../ports/task.repository.port';
import { TaskEntity, TaskProps } from '../domain/tasks.entity';

@Injectable()
export class DeleteTaskUsecase {
  constructor(
    @Inject('TaskRepositoryPort')
    private readonly taskRepository: TaskRepositoryPort,
  ) {}

  async execute(
    id: number,
  ): Promise<{ deleted: boolean }> {
    const task = await this.taskRepository.findById(id);
    console.log('execute: task', task);

    if (!task) throw new Error('Task cannot be found');

    task.ensureCanBeDeleted();

    const resp = await this.taskRepository.delete(id);
    console.log('DeleteTaskUsecase.execute: resp', resp);

    return resp;
  }
}
