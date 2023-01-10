import { initTRPC } from '@trpc/server';

const { router, procedure } = initTRPC.create();

export const appRouter = router({
    greeting: procedure.query(() => 'TODO'),
});

export type AppRouter = typeof appRouter;
