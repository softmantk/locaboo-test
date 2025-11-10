import { TaskEntity, BLOCKED_USERS } from './tasks.entity';
import { TaskAssignmentError, TaskCannotBeDeleted } from './task.errors';

describe('TaskEntity Domain', () => {
  it('should create a task with default vals', () => {
    const t = TaskEntity.create({ title: 'Test Task' });
    const data = t.data;

    expect(data.status).toBe('todo');
    expect(data.priority).toBe('low');
    expect(data.createdAt).toBeInstanceOf(Date);
  });

  it('assignUser should work fine if valid', () => {
    const task = TaskEntity.create({
      title: 'Valid Task',
      description: 'something here',
    });

    task.assignUser(1);
    expect(task.data.assigneeId).toBe(1);
  });

  it('throw error if user is blocked', () => {
    const t = TaskEntity.create({
      title: 'Blocked case',
      description: 'sample desc',
    });

    expect(() => t.assignUser(BLOCKED_USERS[0])).toThrow(TaskAssignmentError);
  });

  it('should fail assign when missing description', () => {
    const t = TaskEntity.create({ title: 'No description provided' });

    expect(() => t.assignUser(3)).toThrow(TaskAssignmentError);
  });

  it('should throw TaskCannotBeDeleted for inprogress tasks', () => {
    const t = TaskEntity.fromPersistence({
      id: 10,
      title: 'In Progress Task',
      // status: 'todo',
      status: 'inProgress',
    });

    expect(() => t.ensureCanBeDeleted()).toThrow(TaskCannotBeDeleted);
  });

  it('should allow deletion if status todo', () => {
    const tt = TaskEntity.fromPersistence({
      id: 12,
      title: 'Deletable task',
      status: 'todo',
    });

    expect(() => tt.ensureCanBeDeleted()).not.toThrow();
  });
});
