import { useMemo } from 'react';

import { ApolloClient, InMemoryCache } from '@apollo/client';

import { grapqlUrl } from '../constants/urls';

export const useApollo = () =>
    useMemo(
        () =>
            new ApolloClient({
                uri: `http://localhost:3000${grapqlUrl}`,
                cache: new InMemoryCache({}),
            }),
        []
    );
