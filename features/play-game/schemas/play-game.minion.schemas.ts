import { z } from 'zod';
import { minionIds } from '@prisma/client';

export const minionIdsValues = [
    minionIds.alleycat,
    minionIds.scavengingHyena,
] as const; // TODO: no automatic way to generate zod enums fron objects (casting or manual)
export const minionIdSchema = z.enum(minionIdsValues);
export const minionIdsSchema = z.array(minionIdSchema);
