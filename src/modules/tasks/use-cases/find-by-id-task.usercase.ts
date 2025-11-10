import { Inject, Injectable } from '@nestjs/common';
import { TaskRepositoryPort } from '../ports/task.repository.port';
import { TaskEntity, TaskProps } from '../domain/tasks.entity';

@Injectable()
export class FindByIdTaskUsecase {
  constructor(
    @Inject('TaskRepositoryPort')
    private readonly taskRepository: TaskRepositoryPort,
  ) {}

  async execute(id: number): Promise<TaskEntity | null> {
    const task = await this.taskRepository.findById(id);
    return task ?? null;
  }
}
