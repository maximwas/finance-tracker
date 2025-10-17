import { Injectable } from '@nestjs/common';
import { ConfigService as ConfigServiceNest } from '@nestjs/config';

@Injectable()
export class ConfigService extends ConfigServiceNest {
  constructor() {
    super();
  }

  public isDev(): boolean {
    return (
      this.getOrThrow('NODE_ENV') === 'develop' ||
      this.getOrThrow('NODE_ENV') === 'local'
    );
  }

  public isProduction(): boolean {
    return this.getOrThrow('NODE_ENV') === 'prod';
  }
}
