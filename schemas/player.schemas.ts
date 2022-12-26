import { z } from 'zod';
import { maxLoginLength, minLoginLength } from '../configs/login.config';

export const playerIdSchema = z.string();
export const playerLoginSchema = z
    .string()
    .min(minLoginLength)
    .max(maxLoginLength);

export const playerSchema = z.object({
    playerLogin: playerLoginSchema,
    playerId: playerIdSchema,
});
