export type ErrorCategory =
  | 'NOT_FOUND'
  | 'VALIDATION'
  | 'BUSINESS_RULE'
  | 'SYSTEM';

export class AppError extends Error {
  readonly category: ErrorCategory;
  readonly meta?: Record<string, any>;

  constructor(
    message: string,
    category: ErrorCategory = 'SYSTEM',
    meta?: Record<string, any>,
  ) {
    super(message);
    this.category = category;
    this.meta = meta;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
