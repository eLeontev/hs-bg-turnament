import { initTRPC } from '@trpc/server';
import { CreateContext } from './context';

const runtimeConfig = initTRPC.context<CreateContext>().create();

export const router = runtimeConfig.router;
export const procedure = runtimeConfig.procedure;
