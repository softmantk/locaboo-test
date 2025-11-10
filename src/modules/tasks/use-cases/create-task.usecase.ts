import { Inject, Injectable } from '@nestjs/common';
import { type TaskRepositoryPort } from '../ports/task.repository.port';
import { NewTaskProps, TaskEntity, TaskProps } from '../domain/tasks.entity';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject('TaskRepositoryPort')
    private readonly taskRepo: TaskRepositoryPort,
  ) {}

  async execute(newTaskProp: NewTaskProps): Promise<TaskEntity> {
    const newTaskEntity = TaskEntity.create(newTaskProp);
    const response = await this.taskRepo.create(newTaskEntity.data);
    console.log('execute: response', response);
    return response;
  }
}
