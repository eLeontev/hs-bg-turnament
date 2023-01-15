import { playGamePhases } from '@prisma/client';
import { z } from 'zod';

import { gameIdSchema } from './pending-games.schemas';
import { heroIdSchema } from './play-game.hero.schemas';
import { playerIdSchema, playerLoginSchema } from './player.schemas';

export const startPlayGameInputSchema = z.object({
    playerId: playerIdSchema,
    gameId: gameIdSchema,
});

export const playGameBaseInputSchema = z.object({
    gameId: gameIdSchema,
    playerIdInGame: playerIdSchema,
});

export const playGameJoinLeavePayloadSchema = playGameBaseInputSchema;

export const playGamePlayerDetailsSchema = z.object({
    playerLogin: playerLoginSchema,
    key: z.string(),
});

const playGamePhasesValues = [
    playGamePhases.heroSelection,
    playGamePhases.recruit,
    playGamePhases.combat,
] as const; // TODO: no automatic way to generate zod enums fron objects (casting or manual)
export const playGameZodPhases = z.enum(playGamePhasesValues);

export const playGameDetailsOutputSchema = z.object({
    gameId: gameIdSchema,
    phase: playGameZodPhases,
    players: z.array(playGamePlayerDetailsSchema),
});

export const playGameSelectHeroSchema = playGameBaseInputSchema.merge(
    z.object({
        heroId: heroIdSchema,
    })
);
