import {
    handCardIdsSelector,
    playCardSelector,
    usePlayerStore,
} from '../store/play-game.player.store';
import { trpc } from '../../../../lib/client';
import { isPlayCardActionDisabled } from '../../validators/play-game.player-actions.validators';
import { Flex } from '@mantine/core';
import { MinionCardWithOwnState } from './minion.component';
import { CardId } from '../../../../data/minions/battle-cries/minions.battle-cries';

export const HandMinions = () => {
    const handCardIds = usePlayerStore(handCardIdsSelector);
    const playCard = usePlayerStore(playCardSelector);

    const { mutateAsync } = trpc.playMinion.useMutation();

    return (
        <Flex h={330}>
            {handCardIds.map((cardId: CardId) => (
                <MinionCardWithOwnState
                    key={cardId}
                    cardId={cardId}
                    cardActionLabel="Play minion"
                    request={mutateAsync}
                    stateAction={playCard}
                    actionValidator={isPlayCardActionDisabled}
                ></MinionCardWithOwnState>
            ))}
        </Flex>
    );
};
