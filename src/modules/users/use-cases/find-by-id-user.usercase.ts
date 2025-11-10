import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../ports/user.repository.port';
import { UserProps } from '../domain/users.entity';

@Injectable()
export class FindByIdUserUsecase {
  constructor(
    @Inject('UsersRepositoryPort')
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(id: number): Promise<UserProps | null> {
    const user = await this.userRepository.findById(id);
    return user?.data ?? null;
  }
}
