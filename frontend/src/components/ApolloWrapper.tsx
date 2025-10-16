"use client";

import { initializeApollo } from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client/react";

export interface IApolloWrapper {
  children: React.ReactNode
}

export default function ApolloWrapper({ children }: IApolloWrapper) {
  const apolloClient = initializeApollo();

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}