import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserInputDto } from '../user/dto/user.input';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JWTPayload } from './types/jwt-payload';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from './refresh-token.service';
import ms from 'ms';
import { AuthPayload, AuthPayloadProp } from './types/token.type';

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

    if (user && (await this.comparePassword(password, user.password))) {
      return user;
    }

    return null;
  }

  public async signup(signupDto: UserInputDto): Promise<User> {
    return await this.userService.create(signupDto);
  }

  public async refreshToken(token: string | null): Promise<AuthPayload> {
    try {
      if (!token) {
        throw new UnauthorizedException('Token empty');
      }

      const jwtPayload = await this.jwtService.verifyAsync<JWTPayload>(token);
      const storedToken = await this.refreshTokenService.validateRefreshToken(
        token,
        jwtPayload,
      );

      if (!storedToken) {
        throw new UnauthorizedException('Invalid or expired refresh token');
      }

      const accessToken = await this.jwtService.signAsync<JWTPayload>(
        jwtPayload,
        {
          expiresIn: ms('1h'),
        },
      );

      const refreshToken = await this.jwtService.signAsync<JWTPayload>(
        jwtPayload,
        {
          expiresIn: ms('7d'),
        },
      );

      await this.refreshTokenService.updateToken(token, refreshToken);

      return {
        [AuthPayloadProp.AccessToken]: accessToken,
        [AuthPayloadProp.RefreshToken]: refreshToken,
      };
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  public async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
