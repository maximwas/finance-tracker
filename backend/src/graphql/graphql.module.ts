import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from 'src/api/modules/auth/auth.module';

import { CategoryModule } from './modules/category/category.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/_generate/schema.gql'),
      installSubscriptionHandlers: true,
    }),
    AuthModule,
    UserModule,
    CategoryModule,
    TransactionModule,
  ],
  exports: [UserModule, CategoryModule],
})
export class GraphqlModule {}
