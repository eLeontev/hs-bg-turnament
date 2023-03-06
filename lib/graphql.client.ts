import { useMemo } from 'react';

import { ApolloClient, InMemoryCache } from '@apollo/client';

import { graphqlUrl } from '../constants/urls';
import { getBaseUrl } from '../utils.ts/url.utils';

export const useApollo = () =>
    useMemo(
        () =>
            new ApolloClient({
                uri: `${getBaseUrl()}${graphqlUrl}`,
                cache: new InMemoryCache({}),
            }),
        []
    );
