import { z } from 'zod';

import {
    maxGameNameLength,
    minGameNameLength,
} from '../configs/pending-games.config';
import { playerIdSchema, playerLoginSchema } from './player.schemas';

export const gameIdSchema = z.string();

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

export const startPendingGameBodySchema = z.object({
    playerId: playerIdSchema,
    gameId: gameIdSchema,
});
