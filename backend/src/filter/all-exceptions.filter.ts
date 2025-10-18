import {
  ArgumentsHost,
  Catch,
  ContextType,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlContextType } from '@nestjs/graphql';
import { Response } from 'express';
import { ApiResponse } from 'src/dto/api-response.dto';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const response =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const errorResponse = new ApiResponse({
      data: null,
      success: false,
      message:
        typeof response === 'string'
          ? response
          : (response['message'] as string),
    });

    if (host.getType<ContextType>() === 'http') {
      ctx.getResponse<Response>().status(status).json(errorResponse);

      return;
    }

    if (host.getType<GqlContextType>() === 'graphql') {
      throw new Error(JSON.stringify(errorResponse));
    }
  }
}
