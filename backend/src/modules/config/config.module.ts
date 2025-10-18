import { Global, Module } from '@nestjs/common';
import { ConfigModule as ConfigModuleNest } from '@nestjs/config';

import { ConfigService } from './config.service';

@Global()
@Module({
  imports: [
    ConfigModuleNest.forRoot({
      envFilePath: '.env',
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
