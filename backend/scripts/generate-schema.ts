import { NestFactory } from '@nestjs/core';
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql';
import { printSchema } from 'graphql';
import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';

import { CategoryResolver } from '../src/graphql/modules/category/category.resolver';
import { TransactionResolver } from '../src/graphql/modules/transaction/transaction.resolver';

const resolvers = [CategoryResolver, TransactionResolver];

async function generateSchema() {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create(resolvers);
  const outputPath = join(process.cwd(), 'src/_generate/schema.gql');

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, printSchema(schema));

  await app.close();
}

generateSchema()
  .then(() => {
    console.log('Schema generated successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
