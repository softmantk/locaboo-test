import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../ports/user.repository.port';
import { UserProps } from '../domain/users.entity';

@Injectable()
export class PatchUserUsercase {
  constructor(
    @Inject('UsersRepositoryPort')
    private readonly userRepositoryPort: UserRepositoryPort,
  ) {}

  async execute(id: number, data: Partial<UserProps>): Promise<UserProps> {
    const user = await this.userRepositoryPort.findById(id);
    console.log('execute: user', user);

    if (!user) throw new Error('User not found');

    const resp = await this.userRepositoryPort.patch(id, data);
    console.log('execute: resp', resp);

    return resp.data;
  }
}
