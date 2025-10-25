import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'cross-fetch';

let apolloClient: ApolloClient;

function createApolloClient(): ApolloClient {
  const httpLink = new HttpLink({
    uri: 'http://localhost:3003/graphql',
    fetch,
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: httpLink,
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(): ApolloClient {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (typeof window === 'undefined') return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}
