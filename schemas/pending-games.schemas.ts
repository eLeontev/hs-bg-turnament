import { z } from 'zod';

import {
    maxGameNameLength,
    minGameNameLength,
} from '../configs/pending-games.config';

export const authorIdSchema = z.string();
export const authorLoginSchema = z.string();
export const gameNameSchema = z
    .string()
    .min(minGameNameLength)
    .max(maxGameNameLength);

export const deletePendingGameBodySchema = z.object({
    authorId: authorIdSchema,
});
export const createPendingGameBodySchema = z.object({
    authorId: authorIdSchema,
    authorLogin: authorLoginSchema,
    gameName: gameNameSchema,
});
