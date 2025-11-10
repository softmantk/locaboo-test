import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskUseCase } from '../use-cases/create-task.usecase';
import {
  assignTaskParamDto,
  CreateTaskDto,
  FindTasksQueryDto,
  UpdateTaskDto,
} from './tasks.dto';
import { PatchTaskUsercase } from '../use-cases/patch-task.usercase';
import { FindByIdTaskUsecase } from '../use-cases/find-by-id-task.usercase';
import { FindTasksUsecase } from '../use-cases/find-tasks.usecase';
import { IdParamDto } from '../../../shared/dto/id-param.dto';
import { PaginatedResult } from '../../../shared/types/pagination.types';
import { TaskProps } from '../domain/tasks.entity';
import { DeleteTaskUsecase } from '../use-cases/delete-task.usecase';
import { AssignTaskUseCase } from '../use-cases/assign-task.usecase';
import { TaskNotFoundError } from '../domain/task.errors';

@Controller('tasks')
export class TasksController {
  constructor(
    private createTaskUseCase: CreateTaskUseCase,
    private patchTaskUserCase: PatchTaskUsercase,
    private findByIdTaskUseCase: FindByIdTaskUsecase,
    private findTasksUseCase: FindTasksUsecase,
    private deleteTaskUsercase: DeleteTaskUsecase,
    private assignTaskUseCase: AssignTaskUseCase,
  ) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskProps> {
    const taskEntity = await this.createTaskUseCase.execute(createTaskDto);
    return taskEntity.data;
  }
  @Get()
  async findAll(
    @Query() query: FindTasksQueryDto,
  ): Promise<PaginatedResult<TaskProps>> {
    const {
      page,
      limit,
      sortBy,
      sortOrder,
      status,
      priority,
      assigneeId,
      reporterId,
    } = query;

    const filters = {
      status,
      priority,
      assigneeId,
      reporterId,
    };

    const pagination = {
      page,
      limit,
      sortBy,
      sortOrder,
    };
    console.log('findAll: filters', { filters, pagination });

    const result = await this.findTasksUseCase.execute(filters, pagination);
    console.log('findAll: result', result);

    return {
      data: result.data.map((task) => task.data),
      meta: result.meta,
    };
  }

  @Get(':id')
  async findById(@Param() params: IdParamDto): Promise<TaskProps> {
    const task = await this.findByIdTaskUseCase.execute(Number(params.id));
    if (!task) {
      throw new TaskNotFoundError(params.id);
    }
    return task.data;
  }

  @Patch(':id')
  async updateById(
    @Param() params: IdParamDto,
    @Body() body: UpdateTaskDto,
  ): Promise<TaskProps> {
    const task = await this.patchTaskUserCase.execute(Number(params.id), body);
    return task.data;
  }

  @Delete(':id')
  async deleteTask(
    @Param() paramDto: IdParamDto,
  ): Promise<{ deleted: boolean }> {
    const response = await this.deleteTaskUsercase.execute(paramDto.id);
    return response;
  }

  @Patch(':taskId/assign-task/:userId')
  async assignTask(@Param() params: assignTaskParamDto): Promise<TaskProps> {
    const response = await this.assignTaskUseCase.execute(
      params.taskId,
      params.userId,
    );
    return response.data;
  }
}
