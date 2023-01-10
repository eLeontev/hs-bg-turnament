import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';

import type { AppRouter } from '../trpc/router';

import { getBaseUrl } from '../utils.ts/url.utils';

export const trpc = createTRPCNext<AppRouter>({
    config: () => ({
        links: [httpBatchLink({ url: `${getBaseUrl()}/api/trpc` })],
    }),
    ssr: true,
});
