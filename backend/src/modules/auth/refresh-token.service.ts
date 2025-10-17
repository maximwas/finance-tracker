import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JWTPayload } from './types/jwt-payload';
import dayjs from 'dayjs';
import ms from 'ms';

@Injectable()
export class RefreshTokenService {
  constructor(private prisma: PrismaService) {}

  public async validateRefreshToken(
    token: string,
    jwtPayload: JWTPayload,
  ): Promise<string | null> {
    const storedToken = await this.prisma.refreshToken.findUnique({
      where: {
        token,
      },
    });

    if (!storedToken) {
      return null;
    }

    if (storedToken.userId !== jwtPayload.id) {
      return null;
    }

    if (storedToken.revoked) {
      return null;
    }

    if (dayjs(storedToken.expiresAt).isBefore(dayjs())) {
      return null;
    }

    return token;
  }

  public async updateToken(oldToken: string, newToken: string): Promise<void> {
    await this.prisma.refreshToken.update({
      where: {
        token: oldToken,
      },
      data: {
        token: newToken,
        expiresAt: dayjs(ms('7d')).toString(),
      },
    });
  }

  public async revokeToken(token: string): Promise<void> {
    await this.prisma.refreshToken.update({
      where: {
        token,
      },
      data: {
        revoked: true,
      },
    });
  }
}
