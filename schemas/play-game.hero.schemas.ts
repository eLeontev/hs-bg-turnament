import { heroIds } from '@prisma/client';
import { z } from 'zod';

const herIdsValues = [
    heroIds.afkay,
    heroIds.alkair,
    heroIds.alexstrasza,
] as const; // TODO: no automatic way to generate zod enums fron objects (casting or manual)
export const heroIdSchema = z.enum(herIdsValues);
export const heroIdsSchema = z.array(heroIdSchema);
