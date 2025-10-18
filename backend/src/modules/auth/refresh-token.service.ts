import { Injectable } from '@nestjs/common';
import { RefreshToken } from '@prisma/client';
import dayjs from 'dayjs';

import { JWTPayload } from './types/jwt-payload';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RefreshTokenService {
  constructor(private prisma: PrismaService) {}

  public async create(
    data: Pick<RefreshToken, 'token' | 'expiresAt' | 'userId'>,
  ): Promise<void> {
    await this.prisma.refreshToken.create({
      data,
    });
  }

  public async validate(
    token: string,
    jwtPayload: JWTPayload,
  ): Promise<RefreshToken | null> {
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

    if (dayjs(storedToken.expiresAt).isBefore(dayjs())) {
      return null;
    }

    return storedToken;
  }

  public async revoke(token: string): Promise<void> {
    await this.prisma.refreshToken.update({
      where: {
        token,
      },
      data: {
        revoked: true,
      },
    });
  }

  public async deleteByToken(token: string): Promise<void> {
    await this.prisma.refreshToken.delete({
      where: { token },
    });
  }

  public async deleteExpiredTokens(take: number = 100): Promise<void> {
    const expiredTokens = await this.prisma.refreshToken.findMany({
      where: {
        OR: [
          {
            revoked: true,
          },
          {
            expiresAt: {
              lt: dayjs().toDate(),
            },
          },
        ],
      },
      select: {
        id: true,
      },
      take,
    });

    if (expiredTokens.length === 0) return;

    const ids = expiredTokens.map((token) => token.id);

    await this.prisma.refreshToken.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    console.log(`Deleted ${ids.length} expired tokens`);
  }
}
