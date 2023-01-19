import { z } from 'zod';

import { heroIdSchema } from './play-game.hero.schemas';
import { minionIdSchema } from './play-game.minion.schemas';
import { playGameBaseInputSchema } from './play-game.schemas';

export const selectHeroPlayerInputSchema = playGameBaseInputSchema.merge(
    z.object({ heroId: heroIdSchema })
);

export const purchasePlayerInputSchema = playGameBaseInputSchema.merge(
    z.object({ minionId: minionIdSchema })
);

export const sellMinionPlayerInputSchema = playGameBaseInputSchema.merge(
    z.object({ minionId: minionIdSchema })
);

export const rollTavernMinionsPlayerInputSchema = playGameBaseInputSchema;
export const upgradeTavernMinionsPlayerInputSchema = playGameBaseInputSchema;

// TODO: depends on Hero power
export const useHeroPowerPlayerInputSchema = playGameBaseInputSchema;

export const rearrangeMinionsAttackOrderPlayerInputSchema =
    playGameBaseInputSchema.merge(
        z.object({ minionIdsOrder: z.array(minionIdSchema) })
    );