import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlContextType } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/dto/api-response.dto';

type UnifiedResponse<T = unknown> =
  | ApiResponse<T>
  | { data: T; extensions: ApiResponse<T> };

@Injectable()
export class TransformResponseInterceptor<
  T = unknown,
> implements NestInterceptor<T>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<UnifiedResponse<T>> {
    return next.handle().pipe(
      map((data: T) => {
        const isGraphQL = context.getType<GqlContextType>() === 'graphql';
        const response = new ApiResponse<T>({
          data,
          message: 'OK',
          success: true,
        });

        return isGraphQL ? { data, extensions: response } : response;
      }),
    );
  }
}