import { TaskAssignmentError, TaskCannotBeDeleted } from './task.errors';

export const TASK_STATUS = ['todo', 'inProgress', 'done', 'blocked'] as const;
export type TaskStatus = (typeof TASK_STATUS)[number];

export const TASK_PRIORITY = ['low', 'medium', 'high'] as const;
export type TaskPriority = (typeof TASK_PRIORITY)[number];

export interface TaskProps {
  id?: number;
  title: string;
  description?: string | null;
  priority?: TaskPriority | null;
  assigneeId?: number | null;
  reporterId?: number | null;
  status?: TaskStatus | null;
  createdAt?: Date;
  updatedAt?: Date;
}
export type NewTaskProps = Omit<TaskProps, 'id'>;

export const UNDELETABLE_TASK_STATUSES = ['inProgress'];

export const BLOCKED_USERS = [4, 5];

export class TaskEntity {
  private props: TaskProps;
  constructor(props: TaskProps) {
    this.props = props;
  }

  static create(input: NewTaskProps) {
    return new TaskEntity({
      ...input,
      id: undefined,
      status: input.status ?? 'todo',
      priority: input.priority ?? 'low',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  static fromPersistence(props: TaskProps): TaskEntity {
    return new TaskEntity(props);
  }

  assignUser(userId: number) {
    this.ensureCanBeAssigned(userId);
    this.props.assigneeId = userId;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
  get data() {
    return this.props;
  }

  canBeDeleted() {
    console.log('canBeDeleted: this.props.status', this.props.status);
    if (UNDELETABLE_TASK_STATUSES.includes(this.props.status ?? '')) {
      return {
        canBeDeleted: false,
        reason: `task in status ${this.props.status} is not allowed to be deleted`,
      };
    }
    return {
      canBeDeleted: true,
    };
  }
  ensureCanBeDeleted() {
    const result = this.canBeDeleted();
    if (!result.canBeDeleted) {
      throw new TaskCannotBeDeleted(result.reason ?? '', this.props.id);
    }
  }

  canBeAssigned(userId: number): { canBeAssigned: boolean; reason?: string } {
    if (BLOCKED_USERS.includes(userId)) {
      return {
        canBeAssigned: false,
        reason: 'User has been blocked',
      };
    }
    if (!this.props.title) {
      return {
        canBeAssigned: false,
        reason: 'title is missing',
      };
    }
    if (!this.props.description) {
      return {
        canBeAssigned: false,
        reason: 'description is missing',
      };
    }

    return {
      canBeAssigned: true,
    };
  }
  ensureCanBeAssigned(userId: number) {
    const result = this.canBeAssigned(userId);
    if (!result.canBeAssigned) {
      throw new TaskAssignmentError(result.reason ?? '', userId);
    }
  }
}
