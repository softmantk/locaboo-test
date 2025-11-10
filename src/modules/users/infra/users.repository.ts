import { PrismaService } from '../../../shared/infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import {
  PaginatedResult,
  PaginationParams,
} from '../../../shared/types/pagination.types';
import { UserFilters, UserRepositoryPort } from '../ports/user.repository.port';
import { UserEntity, UserProps } from '../domain/users.entity';
import { asyncWrapProviders } from 'node:async_hooks';

@Injectable()
export class UsersRepository implements UserRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: UserProps): Promise<UserEntity> {
    const newUser = await this.prisma.user.create({
      data: user,
    });
    return UserEntity.fromPersistence(newUser);
  }

  async findById(id: number): Promise<UserEntity | null> {
    const userEntity = await this.prisma.user.findUnique({
      where: { id },
    });
    if (userEntity) {
      return UserEntity.fromPersistence(userEntity);
    }
    return null;
  }

  async findOne(filter: Partial<UserProps>): Promise<UserEntity | null> {
    const user = await this.prisma.user.findFirst({ where: filter });
    if (!user) {
      return null;
    }
    return UserEntity.fromPersistence(user);
  }

  async patch(id: number, data: Partial<UserProps>): Promise<UserEntity> {
    const resp = await this.prisma.user.update({ where: { id }, data });
    return UserEntity.fromPersistence(resp);
  }

  async findAll(
    filters?: UserFilters,
    pagination?: PaginationParams,
  ): Promise<PaginatedResult<UserEntity>> {
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const skip = (page - 1) * limit;

    const where: Record<string, any> = filters ?? {};

    const orderBy: Record<string, any> = {};
    console.log('findAll: where', where);
    console.log('findAll: pagination', pagination);

    if (pagination?.sortBy) {
      orderBy[pagination.sortBy] = pagination.sortOrder || 'desc';
    } else {
      orderBy.createdAt = 'desc';
    }
    console.log('findAll: orderBy', orderBy);

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      this.prisma.user.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: data.map(UserEntity.fromPersistence),
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }
}
