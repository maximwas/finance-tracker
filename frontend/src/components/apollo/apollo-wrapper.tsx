'use client';

import { ApolloProvider } from '@apollo/client/react';
import type { JSX, ReactNode } from 'react';

import { initializeApollo } from '@/lib/apollo-client';

export interface IApolloWrapper {
  children: ReactNode;
}

export function ApolloWrapper({ children }: IApolloWrapper): JSX.Element {
  const apolloClient = initializeApollo();

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
