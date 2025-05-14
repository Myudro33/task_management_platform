// common/filters/all-exceptions.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.error('Custom filter triggered:', exception); // This should appear in the terminal

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let stack: string | null = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();

      if (typeof errorResponse === 'string') {
        message = errorResponse;
      } else if (typeof errorResponse === 'object' && errorResponse !== null) {
        message =
          (errorResponse as any).message ||
          (errorResponse as any).error ||
          exception.message;
      }

      stack = exception.stack || null;
    } else if (exception instanceof Error) {
      message = exception.message;
      stack = exception.stack || null;
    }

    response.status(status).json({
      statusCode: status,
      message,
      stack,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
