import { z } from 'zod';

import {
    selectHeroPlayerInputSchema,
    purchasePlayerInputSchema,
    sellMinionPlayerInputSchema,
    rollTavernMinionsPlayerInputSchema,
    upgradeTavernMinionsPlayerInputSchema,
    useHeroPowerPlayerInputSchema,
    rearrangeMinionsAttackOrderPlayerInputSchema,
    playMinionPlayerInputSchema,
    freezeMinionsPlayerInputSchema,
} from '../schemas/play-game.player-actions.schemas';

import { playGamePlayerActions } from '../play-game.enums';

export type SelectHeroPlayerInput = z.infer<typeof selectHeroPlayerInputSchema>;
export type PurchasePlayerInput = z.infer<typeof purchasePlayerInputSchema>;
export type SellMinionsPlayerInput = z.infer<
    typeof sellMinionPlayerInputSchema
>;
export type PlayMinionPlayerInput = z.infer<typeof playMinionPlayerInputSchema>;
export type RollTavernMinionsPlayerInput = z.infer<
    typeof rollTavernMinionsPlayerInputSchema
>;
export type UpgradeTavernPlayerInput = z.infer<
    typeof upgradeTavernMinionsPlayerInputSchema
>;
export type FreezeMinionsPlayerInput = z.infer<
    typeof freezeMinionsPlayerInputSchema
>;
export type UseHeroPowerPlayerInput = z.infer<
    typeof useHeroPowerPlayerInputSchema
>;
export type RearrangeMinionsAttackOrderPlayerInput = z.infer<
    typeof rearrangeMinionsAttackOrderPlayerInputSchema
>;

export type PlayGamePlayerActionInput = {
    [playGamePlayerActions.selectHero]: SelectHeroPlayerInput;
    [playGamePlayerActions.purchaseMinion]: PurchasePlayerInput;
    [playGamePlayerActions.sellMinion]: SellMinionsPlayerInput;
    [playGamePlayerActions.rollTavernMinions]: RollTavernMinionsPlayerInput;
    [playGamePlayerActions.upgradeTavern]: UpgradeTavernPlayerInput;
    [playGamePlayerActions.freezeMinions]: FreezeMinionsPlayerInput;
    [playGamePlayerActions.useHeroPower]: UseHeroPowerPlayerInput;
    [playGamePlayerActions.rearrangeMinionsAttackOrder]: RearrangeMinionsAttackOrderPlayerInput;
};
