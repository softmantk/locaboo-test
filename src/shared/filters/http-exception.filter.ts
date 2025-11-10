import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';
import { AppError } from '../errors/app.error';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof AppError) {
      let status: number;

      switch (exception.category) {
        case 'NOT_FOUND':
          status = HttpStatus.NOT_FOUND;
          break;
        case 'BUSINESS_RULE':
          status = HttpStatus.BAD_REQUEST;
          break;
        case 'VALIDATION':
          status = HttpStatus.UNPROCESSABLE_ENTITY;
          break;
        default:
          status = HttpStatus.INTERNAL_SERVER_ERROR;
      }

      return response.status(status).json({
        statusCode: status,
        message: exception.message,
        meta: exception.meta ?? {},
      });
    }

    console.error('Unhandled error:', exception);
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: 500,
      message: 'Unexpected system error',
    });
  }
}
