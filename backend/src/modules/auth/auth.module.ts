import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RefreshTokenService } from './refresh-token.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { ConfigService } from '../config/config.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getJWTSecret(),
      }),
    }),
  ],
  providers: [AuthService, RefreshTokenService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService, RefreshTokenService],
})
export class AuthModule {}
