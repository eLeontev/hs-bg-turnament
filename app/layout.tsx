'use client';

import { ApolloProvider } from '@apollo/client';

import { useApollo } from '../lib/graphql.client';

import '../styles/globals.css';

const RootLayout = ({ children }: any) => {
  const client = useApollo();

  return (
    <html lang="en">
      <body>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </body>
    </html>
  );
};

export default RootLayout;
