import { Injectable } from '@nestjs/common';
import { ConfigService as ConfigServiceNest } from '@nestjs/config';

@Injectable()
export class ConfigService extends ConfigServiceNest {
  constructor() {
    super();
  }

  public isDev(): boolean {
    return (
      this.getOrThrow<string>('NODE_ENV') === 'develop' ||
      this.getOrThrow<string>('NODE_ENV') === 'local'
    );
  }

  public isStage(): boolean {
    return this.getOrThrow<string>('NODE_ENV') === 'stage';
  }

  public isProduction(): boolean {
    return this.getOrThrow<string>('NODE_ENV') === 'prod';
  }

  public getJWTSecret(): string {
    return this.getOrThrow<string>('JWT_SECRET');
  }

  public getRefreshTokenKey(): string {
    return this.getOrThrow<string>('REFRESH_TOKEN_KEY');
  }
}
