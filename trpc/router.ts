import { router } from './runtime-config';

import { playerProcedures } from './api/play-game.player-procedures';

export const appRouter = router({
    ...playerProcedures,
});

export type AppRouter = typeof appRouter;
