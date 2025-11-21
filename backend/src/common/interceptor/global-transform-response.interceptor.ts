import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlContextType } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/common/dto/api-response-dto';

import { MESSAGE_META_KEY } from '../reflector/message.reflector';

@Injectable()
export class GlobalTransformResponseInterceptor<T = unknown>
  implements NestInterceptor<T>
{
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const message = this.reflector.get<string>(
      MESSAGE_META_KEY,
      context.getHandler(),
    );

    return next.handle().pipe(
      map((data: T) => {
        const isGraphQL = context.getType<GqlContextType>() === 'graphql';
        const response = new ApiResponse<T>({
          data,
          message,
          success: true,
        });

        return isGraphQL ? data : response;
      }),
    );
  }
}
