import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import { pick } from 'radash';
import {
  EXPIRES_AT_ACCESS_TOKEN,
  EXPIRES_AT_REFRESH_TOKEN,
} from 'src/constants';
import { hash } from 'src/shared/utils/hash';

import { SignupDto } from './dto/signup.dto';
import { RefreshTokenService } from './refresh-token.service';
import { JWTPayload } from './types/jwt-payload';
import {
  AuthPayload,
  AuthPayloadProp,
  IRefreshTokenOptions,
} from './types/token.type';
import { ConfigService } from '../config/config.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  public async verifyUser(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }

  public async signup(signupDto: SignupDto): Promise<AuthPayload> {
    const existingUser = await this.userService.findByEmail(signupDto.email);

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashed = await bcrypt.hash(signupDto.password, 10);
    const user = await this.userService.create({
      ...signupDto,
      password: hashed,
    });

    const tokens = await this.generateTokens(pick(user, ['id', 'email']));

    return tokens;
  }

  public async refreshToken(
    token: string | null,
    { isSSR, times, signature }: IRefreshTokenOptions,
  ): Promise<AuthPayload> {
    if (!token) {
      throw new UnauthorizedException('Token empty');
    }

    if (isSSR) {
      this.validateSSRSignature(token, times, signature);
    }

    const jwtPayload = await this.jwtService.verifyAsync<JWTPayload>(token);
    const hashed = hash(token, this.configService.getRefreshTokenSecret());
    const storedToken = await this.refreshTokenService.validate(
      hashed,
      jwtPayload,
    );

    if (!storedToken) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    if (isSSR) {
      return {
        [AuthPayloadProp.AccessToken]: await this.generateAccessToken(
          pick(jwtPayload, ['id', 'email']),
        ),
        [AuthPayloadProp.RefreshToken]: token,
      };
    }

    if (storedToken.revoked) {
      throw new UnauthorizedException(
        'Refresh token has already been used or revoked',
      );
    }

    await this.refreshTokenService.revoke(hashed);

    return this.generateTokens(pick(jwtPayload, ['id', 'email']));
  }

  private validateSSRSignature(
    token: string,
    times: IRefreshTokenOptions['times'],
    signature: IRefreshTokenOptions['signature'],
  ): void {
    if (!times || !signature) {
      throw new UnauthorizedException('Invalid SSR refresh');
    }

    const expected = hash(
      `${token}.${times}`,
      this.configService.getSSRSecret(),
    );

    if (expected !== signature) {
      throw new UnauthorizedException('Invalid SSR signature');
    }
  }

  public async login(user: User, token: string | null): Promise<AuthPayload> {
    const tokens = await this.generateTokens(pick(user, ['id', 'email']));
    if (token) {
      const hashed = hash(token, this.configService.getRefreshTokenSecret());

      await this.refreshTokenService.revoke(hashed);
    }

    return tokens;
  }

  public async logout(token: string): Promise<void> {
    const hashed = hash(token, this.configService.getRefreshTokenSecret());

    await this.refreshTokenService.revoke(hashed);
  }

  private async generateTokens(jwtPayload: JWTPayload): Promise<AuthPayload> {
    const accessToken = await this.generateAccessToken(jwtPayload);
    const refreshToken = await this.generateRefreshToken(jwtPayload);
    const hashed = hash(
      refreshToken,
      this.configService.getRefreshTokenSecret(),
    );

    await this.refreshTokenService.create({
      userId: jwtPayload.id,
      token: hashed,
      expiresAt: dayjs()
        .add(Number(EXPIRES_AT_REFRESH_TOKEN[0]), 'day')
        .toDate(),
    });

    return {
      [AuthPayloadProp.AccessToken]: accessToken,
      [AuthPayloadProp.RefreshToken]: refreshToken,
    };
  }

  private async generateAccessToken(jwtPayload: JWTPayload): Promise<string> {
    const accessToken = await this.jwtService.signAsync<JWTPayload>(
      jwtPayload,
      {
        expiresIn: EXPIRES_AT_ACCESS_TOKEN,
      },
    );

    return accessToken;
  }

  private async generateRefreshToken(jwtPayload: JWTPayload): Promise<string> {
    const refreshToken = await this.jwtService.signAsync<JWTPayload>(
      jwtPayload,
      {
        expiresIn: EXPIRES_AT_REFRESH_TOKEN,
      },
    );

    return refreshToken;
  }
}
