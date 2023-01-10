import { useMemo } from 'react';

import { ApolloClient, InMemoryCache } from '@apollo/client';

import { grapqlUrl } from '../constants/urls';
import { getBaseUrl } from '../utils.ts/url.utils';

export const useApollo = () =>
    useMemo(
        () =>
            new ApolloClient({
                uri: `${getBaseUrl()}${grapqlUrl}`,
                cache: new InMemoryCache({}),
            }),
        []
    );
