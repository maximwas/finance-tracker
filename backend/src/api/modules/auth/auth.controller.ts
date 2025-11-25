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
import {
  HEADER_REQUEST_SSR,
  HEADER_SIGNATURE_SSR,
  HEADER_TIMES_SSR,
} from '@shared/constants';
import type { Request, Response } from 'express';

import { Message } from '@backend/common/reflector/message.reflector';
import { getCookie } from '@backend/common/utils/get-cookie';
import { getHeader } from '@backend/common/utils/get-header';

import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { JWTAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { AuthPayload } from './types/token.type';
import { ConfigService } from '../../../common/modules/config/config.service';
import { CurrentUser } from '../../../graphql/modules/user/decorator/user.decorator';

@Controller({
  version: '1',
  path: '/api/auth',
})
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  @UseInterceptors(TokenInterceptor)
  @Message('Register successful')
  signup(@Body() signupDto: SignupDto): Promise<AuthPayload> {
    return this.authService.signup(signupDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  @UseInterceptors(TokenInterceptor)
  @Message('Refresh token successful')
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
  @Message('Login successful')
  login(@Req() req: Request, @CurrentUser() user: User): Promise<AuthPayload> {
    const refreshToken = getCookie(
      req.cookies,
      this.configService.getRefreshTokenKey(),
    );

    return this.authService.login(user, refreshToken);
  }

  @HttpCode(HttpStatus.OK)
  @Get('me')
  @UseGuards(JWTAuthGuard)
  @Message('Get user info successful')
  me(
    @CurrentUser() user: User,
  ): Promise<Pick<User, 'id' | 'firstName' | 'lastName'>> {
    return this.authService.me(user.id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('logout')
  @Message('logout successful')
  async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
    const refreshToken = getCookie(
      req.cookies,
      this.configService.getRefreshTokenKey(),
    );

    if (refreshToken) {
      await this.authService.logout(refreshToken);
    }

    res.clearCookie(this.configService.getRefreshTokenKey());
    res.clearCookie(this.configService.getAccessTokenKey());
    res.send();
  }
}
