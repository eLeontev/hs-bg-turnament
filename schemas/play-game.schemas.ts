import { z } from 'zod';

import { gameIdSchema } from './pending-games.schemas';
import { playerIdSchema } from './player.schemas';

export const startPlayGameBodySchema = z.object({
    playerId: playerIdSchema,
    gameId: gameIdSchema,
});

export const playGameBodySchema = z.object({
    gameId: gameIdSchema,
    playerIdInGame: playerIdSchema,
});

export const playGameJoinLeavePayloadSchema = z.object({
    gameId: gameIdSchema,
    playerIdInGame: playerIdSchema,
});
