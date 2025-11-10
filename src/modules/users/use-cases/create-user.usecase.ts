import { Inject, Injectable } from '@nestjs/common';
import { NewUserProps, UserEntity, UserProps } from '../domain/users.entity';
import { UserRepositoryPort } from '../ports/user.repository.port';
import { UserEmailAlreadyExist } from '../domain/users.errors';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UsersRepositoryPort')
    private readonly userRepositoryPort: UserRepositoryPort,
  ) {}

  async execute(newUserProps: NewUserProps): Promise<UserProps> {
    const existingUser = await this.userRepositoryPort.findOne({
      email: newUserProps.email,
    });
    if (existingUser) {
      throw new UserEmailAlreadyExist(newUserProps.email);
    }
    const newUserEntity = UserEntity.create(newUserProps);
    const response = await this.userRepositoryPort.create(newUserEntity.data);
    console.log('execute: response', response);
    return response.data;
  }
}
