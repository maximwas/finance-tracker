'use client';

import { ApolloProvider } from '@apollo/client/react';
import { type JSX } from 'react';

import { initializeApollo } from '@/lib/apolloClient';

export interface IApolloWrapper {
  children: React.ReactNode;
}

export function ApolloWrapper({ children }: IApolloWrapper): JSX.Element {
  const apolloClient = initializeApollo();

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
