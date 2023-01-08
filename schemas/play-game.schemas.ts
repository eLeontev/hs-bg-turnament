import { z } from 'zod';

import { gameIdSchema } from './pending-games.schemas';
import { playerIdSchema } from './player.schemas';

export const playGameBodySchema = z.object({
    gameId: gameIdSchema,
    playerId: playerIdSchema,
});
