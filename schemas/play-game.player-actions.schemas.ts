import { z } from 'zod';
import { heroIdSchema } from './play-game.hero.schemas';
import { minionIdSchema } from './play-game.minion.schemas';

import { playerIdInGameSchema } from './player.schemas';

export const baseInputSchema = z.object({
    playerIdInGame: playerIdInGameSchema,
});

export const selectHeroPlayerInputSchema = baseInputSchema.merge(
    z.object({ heroId: heroIdSchema })
);

export const purchasePlayerInputSchema = baseInputSchema.merge(
    z.object({ minionId: minionIdSchema })
);

export const sellMinionPlayerInputSchema = baseInputSchema.merge(
    z.object({ minionId: minionIdSchema })
);

export const rollTavernMinionsPlayerInputSchema = baseInputSchema;
export const upgradeTavernMinionsPlayerInputSchema = baseInputSchema;

// TODO: depends on Hero power
export const useHeroPowerPlayerInputSchema = baseInputSchema;

export const rearrangeMinionsAttackOrderPlayerInputSchema =
    baseInputSchema.merge(
        z.object({ minionIdsOrder: z.array(minionIdSchema) })
    );
