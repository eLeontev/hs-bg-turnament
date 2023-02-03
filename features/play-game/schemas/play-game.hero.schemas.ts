import { heroIds } from '@prisma/client';
import { z } from 'zod';

export const heroIdsValues = [
    heroIds.afkay,
    heroIds.alkair,
    heroIds.alexstrasza,
    heroIds.ambassadorFaelin,
    heroIds.arannaStarseeker,
    heroIds.archVillainRafaam,
    heroIds.brukan,
    heroIds.cthun,
    heroIds.captain,
] as const; // TODO: no automatic way to generate zod enums fron objects (casting or manual)
export const heroIdSchema = z.enum(heroIdsValues);
export const heroIdsSchema = z.array(heroIdSchema);
