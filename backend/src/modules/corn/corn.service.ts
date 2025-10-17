import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { RefreshTokenService } from '../auth/refresh-token.service';

@Injectable()
export class CornService {
  constructor(private refreshTokenService: RefreshTokenService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cleanExpiredTokens(): Promise<void> {
    await this.refreshTokenService.deleteExpiredTokens(200);
  }
}
