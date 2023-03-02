import {
    purchaseCardSelector,
    tavernCardIdsSelector,
    usePlayerStore,
} from '../store/play-game.player.store';
import { trpc } from '../../../../lib/client';
import { CardId } from '../../../../data/minions/battle-cries/minions.battle-cries';
import { isPurchaseCardActionDisabled } from '../../validators/play-game.player-actions.validators';
import { Flex } from '@mantine/core';
import { MinionCardWithOwnState } from './minion.component';

export const TavernMinions = () => {
    const tavernCardIds = usePlayerStore(tavernCardIdsSelector);
    const purchaseCard = usePlayerStore(purchaseCardSelector);

    const { mutateAsync } = trpc.purchaseMinion.useMutation();

    return (
        <Flex h={330}>
            {tavernCardIds.map((cardId: CardId) => (
                <MinionCardWithOwnState
                    key={cardId}
                    cardId={cardId}
                    cardActionLabel="Buy minion"
                    request={mutateAsync}
                    stateAction={purchaseCard}
                    actionValidator={isPurchaseCardActionDisabled}
                ></MinionCardWithOwnState>
            ))}
        </Flex>
    );
};
