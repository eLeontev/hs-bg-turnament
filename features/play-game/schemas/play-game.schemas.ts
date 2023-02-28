import { playGamePhases } from '@prisma/client';
import { z } from 'zod';

import {
    cardIdSchema,
    gameIdSchema,
} from '../../pending-games/pending-games.schemas';
import { heroIdSchema, heroIdsSchema } from './play-game.hero.schemas';
import {
    playerIdInGameSchema,
    playerIdSchema,
    playerKeySchema,
    playerLoginSchema,
} from '../../player/player.schemas';
import { minionIdSchema, minionTypesSchema } from './play-game.minion.schemas';
import { Card } from '../../../data/minions/battle-cries/minions.battle-cries';

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
export const countOfArmorSchema = z.number().min(0);
export const isWonLastTimeSchema = z.boolean().nullable();
export const opponentKeySchema = z.string().nullable();
export const tavernTierSchema = z.number().min(1).max(6);
export const selectedHeroIdSchema = heroIdSchema.nullable();

export const goldAmountSchema = z.number().min(0);
export const minionsRollPriceSchema = z.number().min(0);
export const minionPurchasePriceSchema = z.number().min(0);
export const tavernTierUpgradePriceSchema = z.number().min(0);
export const tavernCardIdsSchema = z.array(cardIdSchema);
export const handCardIdsSchema = z.array(cardIdSchema);
export const deskCardIdsSchema = z.array(cardIdSchema);
export const frozenCardIdsSchema = z.array(cardIdSchema);

export const cardSchema = z.object({
    cardId: cardIdSchema,
    minionId: minionIdSchema,
    minionTypes: minionTypesSchema,
    tavernTier: tavernTierSchema,
    buffs: z.array(z.any()),
});

export const cardsSchema = z.array(cardSchema);

export const playGameGamePlayerDetailsSchema = basePlayerDetailsSchema.merge(
    z.object({
        selectedHeroId: selectedHeroIdSchema,
        countOfArmor: countOfArmorSchema,
        isWonLastTime: isWonLastTimeSchema,
        tavernTier: tavernTierSchema,
    })
);

export const playGamePlayerWithCardsSchema = playGameGamePlayerDetailsSchema
    .merge(
        z.object({
            opponentKey: opponentKeySchema,
            playerIdInGame: playerIdInGameSchema,
            heroIds: heroIdsSchema,
            goldAmount: goldAmountSchema,
            minionsRollPrice: minionsRollPriceSchema,
            minionPurchasePrice: minionPurchasePriceSchema,
            tavernTierUpgradePrice: tavernTierUpgradePriceSchema,
            countOfHitPoints: countOfHitPointsSchema,
            tavernCardIds: tavernCardIdsSchema,
            opponentId: z.string().nullable(),
            handCardIds: handCardIdsSchema,
            deskCardIds: deskCardIdsSchema,
            frozenCardIds: frozenCardIdsSchema,
        })
    )
    .merge(
        z.object({
            cards: cardsSchema,
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
        players: z.array(playGameGamePlayerDetailsSchema),
    })
);
