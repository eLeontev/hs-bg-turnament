import { z } from 'zod';

import {
    selectHeroPlayerInputSchema,
    purchasePlayerInputSchema,
    sellMinionPlayerInputSchema,
    rollTavernMinionsPlayerInputSchema,
    upgradeTavernMinionsPlayerInputSchema,
    useHeroPowerPlayerInputSchema,
    rearrangeMinionsAttackOrderPlayerInputSchema,
} from '../../schemas/play-game.player-actions.schemas';

import { playGamePlayerActions } from '../../enums/play-game.enums';

export type SelectHeroPlayerInput = z.infer<typeof selectHeroPlayerInputSchema>;
export type PurchasePlayerInput = z.infer<typeof purchasePlayerInputSchema>;
export type SellMinionsPlayerInput = z.infer<
    typeof sellMinionPlayerInputSchema
>;
export type RollTavernMinionsPlayerInput = z.infer<
    typeof rollTavernMinionsPlayerInputSchema
>;
export type UpgradeTavernPlayerInput = z.infer<
    typeof upgradeTavernMinionsPlayerInputSchema
>;
export type UseHeroPowerPlayerInput = z.infer<
    typeof useHeroPowerPlayerInputSchema
>;
export type RearrangeMinionsAttackOrderPlayerInput = z.infer<
    typeof rearrangeMinionsAttackOrderPlayerInputSchema
>;

export type PlayGamePlayerActionInput = {
    [playGamePlayerActions.selectHero]: SelectHeroPlayerInput;
    [playGamePlayerActions.purchase]: PurchasePlayerInput;
    [playGamePlayerActions.sellMinions]: SellMinionsPlayerInput;
    [playGamePlayerActions.rollTavernMinions]: RollTavernMinionsPlayerInput;
    [playGamePlayerActions.upgradeTavern]: UpgradeTavernPlayerInput;
    [playGamePlayerActions.useHeroPower]: UseHeroPowerPlayerInput;
    [playGamePlayerActions.rearrangeMinionsAttackOrder]: RearrangeMinionsAttackOrderPlayerInput;
};
