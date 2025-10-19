import { Module } from '@nestjs/common';

import { ApiModule } from './api/api.module';
import { CommonModule } from './common/common.module';
import { GraphqlModule } from './graphql/graphql.module';
@Module({
  imports: [CommonModule, ApiModule, GraphqlModule],
})
export class AppModule {}
