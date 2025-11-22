import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import ms from 'ms';
import { map, Observable, tap } from 'rxjs';
import { ConfigService } from 'src/common/modules/config/config.service';
import { getHeader } from 'src/common/utils/get-header';

import {
  EXPIRES_AT_ACCESS_TOKEN,
  EXPIRES_AT_REFRESH_TOKEN,
  HEADER_AVAILABLE_DATA,
} from '../../../../../../shared/constants';
import { AuthPayload, AuthPayloadProp } from '../types/token.type';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(private configService: ConfigService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<AuthPayload>,
  ): Observable<AuthPayload | null> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response<AuthPayload>>();
    const isAvailableData =
      getHeader<string>(req.headers, HEADER_AVAILABLE_DATA) === 'true';

    return next.handle().pipe(
      tap((authPayload: AuthPayload) => {
        if (authPayload[AuthPayloadProp.RefreshToken] && !isAvailableData) {
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

        if (authPayload[AuthPayloadProp.AccessToken] && !isAvailableData) {
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
      map((authPayload: AuthPayload) => {
        if (isAvailableData) {
          return authPayload;
        }

        return null;
      }),
    );
  }
}
