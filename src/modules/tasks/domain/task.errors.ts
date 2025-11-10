import { AppError } from '../../../shared/errors/app.error';

export class TaskNotFoundError extends AppError {
  constructor(id: number) {
    super(`Task not found`, 'NOT_FOUND', { taskId: id });
  }
}

export class UserNotFoundError extends AppError {
  constructor(id: number) {
    super(`User not found`, 'NOT_FOUND', { userId: id });
  }
}

export class TaskCannotBeDeleted extends AppError {
  constructor(reason: string, taskId?: number) {
    super(`Task cannot be deleted`, 'BUSINESS_RULE', { taskId, reason });
  }
}

export class TaskAssignmentError extends AppError {
  constructor(reason: string, userId?: number) {
    super(`Cannot assign task`, 'BUSINESS_RULE', { userId, reason });
  }
}
