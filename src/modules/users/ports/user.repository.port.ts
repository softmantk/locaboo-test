import {
  PaginatedResult,
  PaginationParams,
} from '../../../shared/types/pagination.types';
import { NewUserProps, UserEntity, UserProps } from '../domain/users.entity';

export interface UserFilters {
  email?: string;
}

export interface UserRepositoryPort {
  create(user: NewUserProps): Promise<UserEntity>;
  findById(id: number): Promise<UserEntity | null>;
  findOne(filter: Partial<UserProps>): Promise<UserEntity | null>;
  patch(id: number, data: Partial<UserProps>): Promise<UserEntity>;
  findAll(
    filters?: UserFilters,
    pagination?: PaginationParams,
  ): Promise<PaginatedResult<UserEntity>>;
}
