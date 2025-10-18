import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { ConfigModule } from './modules/config/config.module';
import { CornModule } from './modules/corn/corn.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [
    ConfigModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/_generate/schema.gql'),
      installSubscriptionHandlers: true,
    }),
    PrismaModule,
    UserModule,
    CornModule,
    AuthModule,
    CategoryModule,
  ],
})
export class AppModule {}
