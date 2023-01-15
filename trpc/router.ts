import { router } from './runtime-config';

import { playerProcedures } from './api/play-game.player-procedures';
import { playGameProcedures } from './api/play-game.procedures';

export const appRouter = router({
    ...playerProcedures,
    ...playGameProcedures,
});

export type AppRouter = typeof appRouter;
