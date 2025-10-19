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
import { getHeader } from 'src/shared/utils/get-header';

import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { TokenInterceptor } from './interceptor/token.interceptor';
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
    const isSSR = getHeader<string>(req.headers, HEADER_REQUEST_SSR) === 'true';
    const times = getHeader<string>(req.headers, HEADER_TIMES_SSR);
    const signature = getHeader<string>(req.headers, HEADER_SIGNATURE_SSR);

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
  login(@Req() req: Request, @CurrentUser() user: User): Promise<AuthPayload> {
    const refreshToken = getCookie(
      req.cookies,
      this.configService.getRefreshTokenKey(),
    );

    return this.authService.login(user, refreshToken);
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
