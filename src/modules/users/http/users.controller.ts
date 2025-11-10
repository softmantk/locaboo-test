import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto, FindusersQueryDto, UpdateUserDto } from './users.dto';
import { FindByIdUserUsecase } from '../use-cases/find-by-id-user.usercase';
import { CreateUserUseCase } from '../use-cases/create-user.usecase';
import { PatchUserUsercase } from '../use-cases/patch-user.usercase';
import { FindUsersUsecase } from '../use-cases/find-users.usecase';
import { IdParamDto } from '../../../shared/dto/id-param.dto';

@Controller('users')
export class UsersController {
  constructor(
    private createUserUserCase: CreateUserUseCase,
    private patchUserUseCase: PatchUserUsercase,
    private findByIdUserUseCase: FindByIdUserUsecase,
    private findUsersUseCase: FindUsersUsecase,
  ) {}

  @Post()
  async create(@Body() createTaskDto: CreateUserDto) {
    return await this.createUserUserCase.execute(createTaskDto);
  }
  @Get()
  async findAll(@Query() query: FindusersQueryDto) {
    const { page, limit, sortBy, sortOrder, email, firstName, lastName } =
      query;

    const filters = {
      email,
      firstName,
      lastName,
    };

    const pagination = {
      page,
      limit,
      sortBy,
      sortOrder,
    };

    return this.findUsersUseCase.execute(filters, pagination);
  }

  @Get(':id')
  async findById(@Param() params: IdParamDto) {
    const user = await this.findByIdUserUseCase.execute(Number(params.id));
    if (!user) {
      throw new NotFoundException('cannot find user');
    }
    return user;
  }

  @Patch(':id')
  async updateById(@Param() params: IdParamDto, @Body() body: UpdateUserDto) {
    console.log('updateById: body', body);

    const user = await this.patchUserUseCase.execute(Number(params.id), body);
    //todo handle not found error
    return user;
  }
}
