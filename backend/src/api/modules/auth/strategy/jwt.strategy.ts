import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from 'src/common/modules/config/config.service';
import { UserService } from 'src/graphql/modules/user/user.service';

import { JWTPayload } from '../types/jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request): string | null => {
          const token = req.cookies?.[
            configService.getAccessTokenKey()
          ] as string;
          console.log(
            '🚀 ~ JwtStrategy ~ constructor ~ req.cookies:',
            req.cookies,
          );
          return typeof token === 'string' ? token : null;
        },
      ]),
      secretOrKey: configService.getJWTSecret(),
    });
  }

  async validate(payload: JWTPayload): Promise<User> {
    console.log('🚀 ~ JwtStrategy ~ validate ~ payload:', payload);
    const user = await this.userService.findById(payload.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
