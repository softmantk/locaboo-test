import { Inject, Injectable } from '@nestjs/common';
import {
  PaginatedResult,
  PaginationParams,
} from '../../../shared/types/pagination.types';
import { UserFilters, UserRepositoryPort } from '../ports/user.repository.port';
import { UserProps } from '../domain/users.entity';

@Injectable()
export class FindUsersUsecase {
  constructor(
    @Inject('UsersRepositoryPort')
    private readonly userRepositoryPort: UserRepositoryPort,
  ) {}

  async execute(
    filters?: UserFilters,
    pagination?: PaginationParams,
  ): Promise<PaginatedResult<UserProps>> {
    const result = await this.userRepositoryPort.findAll(filters, pagination);
    return {
      data: result.data.map((user) => user.data),
      meta: result.meta,
    };
  }
}
