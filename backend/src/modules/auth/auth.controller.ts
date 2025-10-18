import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import type { User } from '@prisma/client';
import type { Request, Response } from 'express';
import {
  HEADER_REQUEST_SSR,
  HEADER_SIGNATURE_SSR,
  HEADER_TIMES_SSR,
} from 'src/constants';
import { getCookie } from 'src/shared/utils/get-cookie';

import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthPayload } from './types/token.type';
import { ConfigService } from '../config/config.service';
import { CurrentUser } from '../user/decorator/user.decorator';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  @UseInterceptors(TokenInterceptor)
  signup(@Body() signupDto: SignupDto): Promise<AuthPayload> {
    return this.authService.signup(signupDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  @UseInterceptors(TokenInterceptor)
  refresh(@Req() req: Request): Promise<AuthPayload> {
    const isSSR = req.headers[HEADER_REQUEST_SSR] === 'true';
    const times = req.headers[HEADER_TIMES_SSR] as string | undefined;
    const signature = req.headers[HEADER_SIGNATURE_SSR] as string | undefined;

    const refreshToken = getCookie(
      req.cookies,
      this.configService.getRefreshTokenKey(),
    );

    return this.authService.refreshToken(refreshToken, {
      isSSR,
      times,
      signature,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(TokenInterceptor)
  login(@CurrentUser() user: User): Promise<AuthPayload> {
    return this.authService.login(user);
  }

  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
    const refreshToken = getCookie(
      req.cookies,
      this.configService.getRefreshTokenKey(),
    );

    if (refreshToken) {
      await this.authService.logout(refreshToken);
    }

    res.clearCookie(this.configService.getRefreshTokenKey());
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
