import { z } from 'zod';
import { minionIds, minionTypes } from '@prisma/client';

export const minionIdsValues = [
    // beasts
    minionIds.alleycat,
    minionIds.scavengingHyena,
    minionIds.leapfrogger,
    minionIds.rabidSaurolisk,
    minionIds.sewerRat,
    minionIds.monstrousMacaw,
    minionIds.ratPack,
    minionIds.caveHydra,
    minionIds.reanimatingRattler,
    minionIds.savannahHighmane,
    minionIds.agamaggan,
    minionIds.mamaBear,
    minionIds.ghastcoiler,
    minionIds.goldrinn,

    // all
    minionIds.ballOfMinions,

    // summon
    minionIds.tabbycat,
    minionIds.turtle,
    minionIds.rat,
    minionIds.hyena,
] as const; // TODO: no automatic way to generate zod enums fron objects (casting or manual)
export const minionIdSchema = z.enum(minionIdsValues);
export const minionIdsSchema = z.array(minionIdSchema);

export const minionTypesValues = [
    minionTypes.beast,
    minionTypes.all,
    minionTypes.noType,
] as const; // TODO: no automatic way to generate zod enums fron objects (casting or manual)
export const minionTypesEnumSchema = z.enum(minionTypesValues);
export const minionTypesSchema = z.array(minionTypesEnumSchema);
