import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from 'src/dto/api-response-dto';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): ApiResponse | undefined {
    const ctx = host.switchToHttp();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const response =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const message =
      typeof response === 'string'
        ? response
        : Array.isArray(response['message'])
          ? response['message'].join(', ')
          : (response['message'] as string) || 'Internal server error';

    Logger.error(exception);

    const errorResponse = new ApiResponse({
      data: null,
      success: false,
      message,
    });

    if (host.getType() === 'http') {
      ctx.getResponse<Response>().status(status).json(errorResponse);
      return;
    }
  }
}
