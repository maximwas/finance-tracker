import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable()
export class GqlResponseInterceptor<Data, Payload extends object>
  implements NestInterceptor<Data>
{
  private readonly logger = new Logger(GqlResponseInterceptor.name);

  constructor(
    private fieldName: Exclude<keyof Payload, 'success' | 'message'>,
    private message?: string,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data: Data) => ({
        [this.fieldName]: data,
        success: true,
        message: this.message || 'Operation completed successfully',
      })),
      catchError((error: unknown) => {
        let message = 'Something went wrong on the server';
        let isClientError = false;

        if (error instanceof Error) {
          message = error.message;
        }

        if (
          typeof error === 'object' &&
          error !== null &&
          'statusCode' in error &&
          typeof error.statusCode === 'number'
        ) {
          const status = error.statusCode;
          isClientError = status < 500;
          if (
            isClientError &&
            'message' in error &&
            typeof error.message === 'string'
          ) {
            message = error.message;
          }
        }

        if (!isClientError) {
          this.logger.error(
            'Server error intercepted',
            error instanceof Error ? error.stack : JSON.stringify(error),
          );

          message = 'Something went wrong on the server';
        }

        return of({
          [this.fieldName]: null,
          success: false,
          message,
        });
      }),
    );
  }
}
