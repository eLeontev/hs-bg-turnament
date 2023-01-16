import { router } from './runtime-config';

import { playerProcedures } from '../features/play-game/procedures/play-game.player-procedures';
import { playGameProcedures } from '../features/play-game/procedures/play-game.procedures';

export const appRouter = router({
    ...playerProcedures,
    ...playGameProcedures,
});

export type AppRouter = typeof appRouter;
