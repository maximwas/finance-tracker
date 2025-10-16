import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: "../backend/src/_generate/schema.gql",
  documents: ["src/graphql/**/*.ts"],
  generates: {
    "src/_generate/graphql.ts": {
      preset: "client",
      plugins: [
        "typescript",
        "typescript-operations",
      ],
      config: {
        reactApolloVersion: 4,
      }
    }
  }
};

export default config;