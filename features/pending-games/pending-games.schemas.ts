import { z } from 'zod';

import { maxGameNameLength, minGameNameLength } from './pending-games.config';
import { playerIdSchema, playerLoginSchema } from '../player/player.schemas';

export const cardIdSchema = z.string();
export const gameIdSchema = z.string();

export const cardSchema = z.object({});
export const gameNameSchema = z
    .string()
    .min(minGameNameLength)
    .max(maxGameNameLength);

export const deletePendingGameBodySchema = z.object({
    playerId: playerIdSchema,
    gameId: gameIdSchema,
});
export const createPendingGameBodySchema = z.object({
    playerId: playerIdSchema,
    playerLogin: playerLoginSchema,
    gameName: gameNameSchema,
});

export const joinPendingGameBodySchema = z.object({
    playerId: playerIdSchema,
    playerLogin: playerLoginSchema,
    gameId: gameIdSchema,
});
export const leavePendingGameBodySchema = z.object({
    playerId: playerIdSchema,
    gameId: gameIdSchema,
});
