import { CreateNextContextOptions } from '@trpc/server/adapters/next';

import { getSocket } from '../utils.ts/socket.utils';

export const createContext = (opts: CreateNextContextOptions) => ({
    io: getSocket(opts.res),
});

export type CreateContext = typeof createContext;
export type Context = ReturnType<CreateContext>;
