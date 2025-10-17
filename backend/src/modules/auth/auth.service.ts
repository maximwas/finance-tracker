import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import ms from 'ms';
import { pick } from 'radash';

import { SignupDto } from './dto/signup.dto';
import { RefreshTokenService } from './refresh-token.service';
import { JWTPayload } from './types/jwt-payload';
import { AuthPayload, AuthPayloadProp } from './types/token.type';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService,
    private userService: UserService,
  ) {}

  public async verifyUser(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userService.findByEmail(email);

    if (user && (await this.compare(password, user.password))) {
      return user;
    }

    return null;
  }

  public async signup(signupDto: SignupDto): Promise<AuthPayload> {
    const existingUser = await this.userService.findByEmail(signupDto.email);

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = await this.userService.create({
      ...signupDto,
      password: await this.hash(signupDto.password),
    });

    const tokens = await this.generateTokens(pick(user, ['id', 'email']));

    return tokens;
  }

  public async refreshToken(token: string | null): Promise<AuthPayload> {
    try {
      if (!token) {
        throw new UnauthorizedException('Token empty');
      }

      const jwtPayload = await this.jwtService.verifyAsync<JWTPayload>(token);
      const storedToken = await this.refreshTokenService.validate(
        token,
        jwtPayload,
      );

      if (!storedToken) {
        throw new UnauthorizedException('Invalid or expired refresh token');
      }

      const accessToken = await this.jwtService.signAsync<JWTPayload>(
        pick(jwtPayload, ['id', 'email']),
        {
          expiresIn: ms('30m'),
        },
      );

      return {
        [AuthPayloadProp.AccessToken]: accessToken,
        [AuthPayloadProp.RefreshToken]: token,
      };
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  public async login(user: User): Promise<AuthPayload> {
    const tokens = await this.generateTokens(pick(user, ['id', 'email']));

    return tokens;
  }

  public async logout(token: string): Promise<void> {
    await this.refreshTokenService.revoke(token);
  }

  public async generateTokens(jwtPayload: JWTPayload): Promise<AuthPayload> {
    const accessToken = await this.jwtService.signAsync<JWTPayload>(
      jwtPayload,
      {
        expiresIn: ms('30m'),
      },
    );

    const refreshToken = await this.jwtService.signAsync<JWTPayload>(
      jwtPayload,
      {
        expiresIn: ms('7d'),
      },
    );

    await this.refreshTokenService.create({
      userId: jwtPayload.id,
      token: refreshToken,
      expiresAt: dayjs().add(7, 'day').toDate(),
    });

    return {
      [AuthPayloadProp.AccessToken]: accessToken,
      [AuthPayloadProp.RefreshToken]: refreshToken,
    };
  }

  public async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
