import { z } from 'zod';
import { gameIdSchema } from './pending-games.schemas';
import { playerIdSchema, privatePlayerIdSchema } from './player.schemas';

export const initPlayGameBodySchema = z.object({
    gameId: gameIdSchema,
    playerId: playerIdSchema,
    privatePlayerId: privatePlayerIdSchema,
});
