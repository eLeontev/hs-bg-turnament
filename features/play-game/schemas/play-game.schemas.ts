import { playGamePhases } from '@prisma/client';
import { z } from 'zod';

import { gameIdSchema } from '../../pending-games/pending-games.schemas';
import { heroIdSchema } from './play-game.hero.schemas';
import {
    playerIdSchema,
    playerKeySchema,
    playerLoginSchema,
} from '../../player/player.schemas';
import { minionTypesSchema } from './play-game.minion.schemas';

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

export const countOfHitPointsSchema = z.number().min(0);
export const isWonLastTimeSchema = z.boolean().nullable();
export const opponentKeySchema = z.string().nullable();

export const playGamePlayerDetailsSchema = basePlayerDetailsSchema.merge(
    z.object({
        selectedHeroId: heroIdSchema.nullable(),
        countOfArmor: countOfHitPointsSchema,
        isWonLastTime: isWonLastTimeSchema,
        opponentKey: opponentKeySchema,
        tavernTier: z.number().min(1).max(6),
    })
);

export const playGamePlayerDetailsWithSelectedHeroIdSchema =
    basePlayerDetailsSchema.merge(z.object({ selectedHeroId: heroIdSchema }));

const playGamePhasesValues = [
    playGamePhases.heroSelection,
    playGamePhases.recruit,
    playGamePhases.combat,
] as const; // TODO: no automatic way to generate zod enums fron objects (casting or manual)
export const playGameZodPhasesSchema = z.enum(playGamePhasesValues);

export const playGamePhaseDurationInMsSchema = z.number().min(1000);
export const playGameRoundSchema = z.number().min(0);

export const playGamePhaseDataSchema = z.object({
    phase: playGameZodPhasesSchema,
    phaseDurationInMs: playGamePhaseDurationInMsSchema,
    phaseStartDate: z.string(),
    round: playGameRoundSchema,
});

export const playGameDetailsOutputSchema = playGamePhaseDataSchema.merge(
    z.object({
        gameId: gameIdSchema,
        playerKey: playerKeySchema,
        minionTypes: minionTypesSchema,
        players: z.array(playGamePlayerDetailsSchema),
    })
);
