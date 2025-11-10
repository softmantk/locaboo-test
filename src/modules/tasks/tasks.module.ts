import { Module } from '@nestjs/common';
import { TaskRepository } from './infra/task.repository';
import { TasksController } from './http/tasks.controller';
import { CreateTaskUseCase } from './use-cases/create-task.usecase';
import { PrismaService } from '../../shared/infra/prisma/prisma.service';
import { FindByIdTaskUsecase } from './use-cases/find-by-id-task.usercase';
import { PatchTaskUsercase } from './use-cases/patch-task.usercase';
import { FindTasksUsecase } from './use-cases/find-tasks.usecase';
import { DeleteTaskUsecase } from './use-cases/delete-task.usecase';
import { AssignTaskUseCase } from './use-cases/assign-task.usecase';
import { UsersRepository } from '../users/infra/users.repository';

@Module({
  controllers: [TasksController],
  providers: [
    PrismaService,
    TaskRepository,
    {
      provide: 'TaskRepositoryPort',
      useExisting: TaskRepository,
    },
    UsersRepository,
    {
      provide: 'UserRepositoryPort',
      useExisting: TaskRepository,
    },
    CreateTaskUseCase,
    PatchTaskUsercase,
    FindByIdTaskUsecase,
    FindTasksUsecase,
    DeleteTaskUsecase,
    AssignTaskUseCase
  ],
})
export class TasksModule {}
