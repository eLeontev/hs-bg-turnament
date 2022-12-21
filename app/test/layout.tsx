'use client';

import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../../lib/appolo-client';

export default function App({ children, pageProps }) {
  const apolloClient = useApollo(pageProps);

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
