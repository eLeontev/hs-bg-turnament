import { z } from 'zod';
import { maxLoginLength, minLoginLength } from '../login/login.config';

export const playerIdSchema = z.string();
export const playerIdInGameSchema = z.string();

export const playerKeySchema = z.string();
export const playerLoginSchema = z
    .string()
    .min(minLoginLength)
    .max(maxLoginLength);

export const playerSchema = z.object({
    playerLogin: playerLoginSchema,
    playerId: playerIdSchema,
});
