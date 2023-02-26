import { procedure } from '../../../trpc/runtime-config';

import {
    freezeMinionsPlayerInputSchema,
    playMinionPlayerInputSchema,
    purchasePlayerInputSchema,
    rearrangeMinionsAttackOrderPlayerInputSchema,
    rollTavernMinionsPlayerInputSchema,
    selectHeroPlayerInputSchema,
    sellMinionPlayerInputSchema,
    upgradeTavernMinionsPlayerInputSchema,
    useHeroPowerPlayerInputSchema,
} from '../schemas/play-game.player-actions.schemas';

import { playGamePlayerActions } from '../play-game.enums';
import { selectPlayGamePlayerHeroMutation } from '../controllers/play-game.controller';
import { playerController } from '../controllers/play-game.player-controller';
import { cardsSchema } from '../schemas/play-game.schemas';

export const playerProcedures = {
    [playGamePlayerActions.selectHero]: procedure
        .input(selectHeroPlayerInputSchema)
        .mutation(({ input, ctx }) =>
            selectPlayGamePlayerHeroMutation({ input, ctx })
        ),
    [playGamePlayerActions.purchaseMinion]: procedure
        .input(purchasePlayerInputSchema)
        .mutation(({ input, ctx }) =>
            playerController.purchaseMinionMutation({ input, ctx })
        ),
    [playGamePlayerActions.sellMinion]: procedure
        .input(sellMinionPlayerInputSchema)
        .mutation(({ input, ctx }) =>
            playerController.sellMinionMutation({ input, ctx })
        ),
    [playGamePlayerActions.playMinion]: procedure
        .input(playMinionPlayerInputSchema)
        .mutation(({ input, ctx }) =>
            playerController.playMinionMutation({ input, ctx })
        ),
    [playGamePlayerActions.rollTavernMinions]: procedure
        .input(rollTavernMinionsPlayerInputSchema)
        .output(cardsSchema)
        .mutation(({ input, ctx }) =>
            playerController.rollTavernMinionsMutation({ input, ctx })
        ),
    [playGamePlayerActions.upgradeTavern]: procedure
        .input(upgradeTavernMinionsPlayerInputSchema)
        .mutation(({ input, ctx }) =>
            playerController.upgradeTavernMutation({ input, ctx })
        ),
    [playGamePlayerActions.freezeMinions]: procedure
        .input(freezeMinionsPlayerInputSchema)
        .mutation(({ input, ctx }) =>
            playerController.freezeMinionsMutation({ input, ctx })
        ),
    [playGamePlayerActions.useHeroPower]: procedure
        .input(useHeroPowerPlayerInputSchema)
        .mutation(() => 'TODO'),
    [playGamePlayerActions.rearrangeMinionsAttackOrder]: procedure
        .input(rearrangeMinionsAttackOrderPlayerInputSchema)
        .mutation(() => 'TODO'),
};
