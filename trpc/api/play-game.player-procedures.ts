import { procedure } from '../runtime-config';

import {
    purchasePlayerInputSchema,
    rearrangeMinionsAttackOrderPlayerInputSchema,
    rollTavernMinionsPlayerInputSchema,
    selectHeroPlayerInputSchema,
    sellMinionPlayerInputSchema,
    upgradeTavernMinionsPlayerInputSchema,
    useHeroPowerPlayerInputSchema,
} from '../../schemas/play-game.player-actions.schemas';

import { playGamePlayerActions } from '../../enums/play-game.enums';

export const playerProcedures = {
    [playGamePlayerActions.selectHero]: procedure
        .input(selectHeroPlayerInputSchema)
        .mutation(() => 'TODO'),
    [playGamePlayerActions.purchase]: procedure
        .input(purchasePlayerInputSchema)
        .mutation(() => 'TODO'),
    [playGamePlayerActions.sellMinions]: procedure
        .input(sellMinionPlayerInputSchema)
        .mutation(() => 'TODO'),
    [playGamePlayerActions.rollTavernMinions]: procedure
        .input(rollTavernMinionsPlayerInputSchema)
        .mutation(() => 'TODO'),
    [playGamePlayerActions.upgradeTavern]: procedure
        .input(upgradeTavernMinionsPlayerInputSchema)
        .mutation(() => 'TODO'),
    [playGamePlayerActions.useHeroPower]: procedure
        .input(useHeroPowerPlayerInputSchema)
        .mutation(() => 'TODO'),
    [playGamePlayerActions.rearrangeMinionsAttackOrder]: procedure
        .input(rearrangeMinionsAttackOrderPlayerInputSchema)
        .mutation(() => 'TODO'),
};
