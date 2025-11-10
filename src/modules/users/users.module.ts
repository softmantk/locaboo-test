import { Module } from '@nestjs/common';
import { PrismaService } from '../../shared/infra/prisma/prisma.service';
import { UsersRepository } from './infra/users.repository';
import { UsersController } from './http/users.controller';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { PatchUserUsercase } from './use-cases/patch-user.usercase';
import { FindByIdUserUsecase } from './use-cases/find-by-id-user.usercase';
import { FindUsersUsecase } from './use-cases/find-users.usecase';

@Module({
  controllers: [UsersController],
  providers: [
    PrismaService,
    UsersRepository,
    {
      provide: 'UsersRepositoryPort',
      useExisting: UsersRepository,
    },
    CreateUserUseCase,
    PatchUserUsercase,
    FindByIdUserUsecase,
    FindUsersUsecase,
  ],
})
export class UsersModule {}
