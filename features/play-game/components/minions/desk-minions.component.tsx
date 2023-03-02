import {
    deskCardIdsSelector,
    sellCardSelector,
    usePlayerStore,
} from '../store/play-game.player.store';
import { trpc } from '../../../../lib/client';
import { isSellCardActionDisabled } from '../../validators/play-game.player-actions.validators';
import { Flex } from '@mantine/core';
import { MinionCardWithOwnState } from './minion.component';
import { CardId } from '../../../../data/minions/battle-cries/minions.battle-cries';

export const DeskMinions = () => {
    const deskCardIds = usePlayerStore(deskCardIdsSelector);
    const sellCard = usePlayerStore(sellCardSelector);

    const { mutateAsync } = trpc.sellMinion.useMutation();

    return (
        <Flex h={330}>
            {deskCardIds.map((cardId: CardId) => (
                <MinionCardWithOwnState
                    key={cardId}
                    cardId={cardId}
                    cardActionLabel="Sell minion"
                    request={mutateAsync}
                    stateAction={sellCard}
                    actionValidator={isSellCardActionDisabled}
                ></MinionCardWithOwnState>
            ))}
        </Flex>
    );
};
