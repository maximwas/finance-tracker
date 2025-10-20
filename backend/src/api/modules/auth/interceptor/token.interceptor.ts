import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Response } from 'express';
import ms from 'ms';
import { map, Observable, tap } from 'rxjs';
import { ConfigService } from 'src/common/modules/config/config.service';

import { AuthPayload, AuthPayloadProp } from '../types/token.type';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(private configService: ConfigService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<AuthPayload>,
  ): Observable<Pick<AuthPayload, AuthPayloadProp.AccessToken>> {
    const ctx = context.switchToHttp();
    const res = ctx.getResponse<Response<AuthPayload>>();

    return next.handle().pipe(
      tap((authPayload: AuthPayload) => {
        if (authPayload[AuthPayloadProp.RefreshToken]) {
          res.cookie(
            this.configService.getRefreshTokenKey(),
            authPayload[AuthPayloadProp.RefreshToken],
            {
              httpOnly: true,
              sameSite: 'lax',
              secure: this.configService.isProduction(),
              maxAge: ms('7d'),
            },
          );
        }
      }),
      map((authPayload: AuthPayload) => ({
        [AuthPayloadProp.AccessToken]: authPayload[AuthPayloadProp.AccessToken],
      })),
    );
  }
}
