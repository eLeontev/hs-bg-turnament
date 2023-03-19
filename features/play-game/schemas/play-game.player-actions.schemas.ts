import { z } from 'zod';
import {
    cardIdSchema,
    cardsPlacementSchema,
} from '../../pending-games/pending-games.schemas';

import { heroIdSchema } from './play-game.hero.schemas';
import { playGameBaseInputSchema } from './play-game.schemas';

export const selectHeroPlayerInputSchema = playGameBaseInputSchema.merge(
    z.object({ heroId: heroIdSchema })
);

export const purchasePlayerInputSchema = playGameBaseInputSchema.merge(
    z.object({ cardId: cardIdSchema })
);

export const sellMinionPlayerInputSchema = playGameBaseInputSchema.merge(
    z.object({ cardId: cardIdSchema })
);

export const playMinionPlayerInputSchema = playGameBaseInputSchema.merge(
    z.object({ cardId: cardIdSchema, targetId: cardIdSchema.optional() })
);
export const rollTavernMinionsPlayerInputSchema = playGameBaseInputSchema;
export const upgradeTavernMinionsPlayerInputSchema = playGameBaseInputSchema;
export const freezeMinionsPlayerInputSchema = playGameBaseInputSchema;

// TODO: depends on Hero power
export const useHeroPowerPlayerInputSchema = playGameBaseInputSchema;

export const rearrangeCardsOrderPlayerInputSchema =
    playGameBaseInputSchema.merge(
        z.object({
            cardsPlacement: cardsPlacementSchema,
            fromCardId: cardIdSchema,
            toCardId: cardIdSchema,
        })
    );
