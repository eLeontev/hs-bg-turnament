import { playGamePhases } from '@prisma/client';
import { z } from 'zod';

import { gameIdSchema } from '../../pending-games/pending-games.schemas';
import { heroIdSchema } from './play-game.hero.schemas';
import {
    playerIdSchema,
    playerKeySchema,
    playerLoginSchema,
} from '../../player/player.schemas';

export const startPlayGameInputSchema = z.object({
    playerId: playerIdSchema,
    gameId: gameIdSchema,
});

export const playGameBaseInputSchema = z.object({
    gameId: gameIdSchema,
    playerIdInGame: playerIdSchema,
});

export const playGameJoinLeavePayloadSchema = playGameBaseInputSchema;

const basePlayerDetailsSchema = z.object({
    playerLogin: playerLoginSchema,
    playerKey: z.string(),
});
export const playGamePlayerDetailsSchema = basePlayerDetailsSchema.merge(
    z.object({ selectedHeroId: heroIdSchema.nullable() })
);

export const playGamePlayerDetailsWithSelectedHeroIdSchema =
    basePlayerDetailsSchema.merge(z.object({ selectedHeroId: heroIdSchema }));

const playGamePhasesValues = [
    playGamePhases.initialisation,
    playGamePhases.heroSelection,
    playGamePhases.recruit,
    playGamePhases.combat,
] as const; // TODO: no automatic way to generate zod enums fron objects (casting or manual)
export const playGameZodPhases = z.enum(playGamePhasesValues);

export const playGameDetailsOutputSchema = z.object({
    gameId: gameIdSchema,
    phase: playGameZodPhases,
    playerKey: playerKeySchema,
    players: z.array(playGamePlayerDetailsSchema),
});

export const playGameSelectHeroSchema = playGameBaseInputSchema.merge(
    z.object({
        heroId: heroIdSchema,
    })
);
