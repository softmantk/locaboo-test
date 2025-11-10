import { AppError } from '../../../shared/errors/app.error';

export class UserEmailAlreadyExist extends AppError {
  constructor(email: string) {
    super(`Email id already exist`, 'BUSINESS_RULE', { email });
  }
}
