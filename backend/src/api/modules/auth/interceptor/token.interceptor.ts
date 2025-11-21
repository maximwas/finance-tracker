import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Response } from 'express';
import ms from 'ms';
import { map, Observable, tap } from 'rxjs';
import {
  EXPIRES_AT_ACCESS_TOKEN,
  EXPIRES_AT_REFRESH_TOKEN,
} from 'src/api/constants';
import { ConfigService } from 'src/common/modules/config/config.service';

import { AuthPayload, AuthPayloadProp } from '../types/token.type';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(private configService: ConfigService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<AuthPayload>,
  ): Observable<null> {
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
              maxAge: ms(EXPIRES_AT_REFRESH_TOKEN),
            },
          );
        }

        if (authPayload[AuthPayloadProp.AccessToken]) {
          res.cookie(
            this.configService.getAccessTokenKey(),
            authPayload[AuthPayloadProp.AccessToken],
            {
              httpOnly: true,
              sameSite: 'lax',
              secure: this.configService.isProduction(),
              maxAge: ms(EXPIRES_AT_ACCESS_TOKEN),
            },
          );
        }
      }),
      map(() => null),
    );
  }
}
