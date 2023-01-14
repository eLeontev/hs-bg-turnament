import { initTRPC } from '@trpc/server';

const runtimeConfig = initTRPC.create();

export const router = runtimeConfig.router;
export const procedure = runtimeConfig.procedure;
