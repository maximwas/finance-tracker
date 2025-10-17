import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { UserInputDto } from '../user/dto/user.input';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import type { Request, Response } from 'express';
import { AuthPayload, AuthPayloadProp } from './types/token.type';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signup(@Body() signupDto: UserInputDto): Promise<User> {
    return this.authService.signup(signupDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Pick<AuthPayload, AuthPayloadProp.AccessToken>> {
    const refreshToken = req.cookies?.Refresh as string | null;
    const authPayload = await this.authService.refreshToken(refreshToken);

    res.cookie(
      this.configService.getOrThrow('REFRESH_TOKEN_KEY'),
      refreshToken,
      {
        httpOnly: true,
        sameSite: 'lax',
        secure: this.configService.getOrThrow('NODE_ENV') !== 'develop',
        maxAge: ms('7d'),
      },
    );

    return {
      [AuthPayloadProp.AccessToken]: authPayload[AuthPayloadProp.AccessToken],
    };
  }
}
