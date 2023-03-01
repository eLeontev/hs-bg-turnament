import { baseInputSelector, usePlayGameStore } from '../store/play-game.store';
import {
    handCardIdsSelector,
    playCardSelector,
    usePlayerStore,
} from '../store/play-game.player.store';
import { trpc } from '../../../../lib/client';
import { CardId } from '../../../../data/minions/battle-cries/minions.battle-cries';
import { isPlayCardActionDisabled } from '../../validators/play-game.player-actions.validators';
import { Flex } from '@mantine/core';
import { MinionCardInGame } from './minion.component';

export const HandMinions = () => {
    const baseInput = usePlayGameStore(baseInputSelector);

    const handCardIds = usePlayerStore(handCardIdsSelector);
    const playCard = usePlayerStore(playCardSelector);

    const { mutateAsync, isLoading } = trpc.playMinion.useMutation();

    const action = (cardId: CardId) => {
        const validatorErrorMessage = isPlayCardActionDisabled(
            usePlayerStore.getState(),
            cardId
        );

        if (validatorErrorMessage) {
            alert(validatorErrorMessage);

            return;
        }

        playCard(cardId);
        mutateAsync({ ...baseInput, cardId }).catch(console.error);
    };

    return (
        <Flex h={330}>
            {handCardIds.map((cardId) => (
                <MinionCardInGame
                    key={cardId}
                    cardId={cardId}
                    isLoading={isLoading}
                    action={() => action(cardId)}
                    label="Play minion"
                    isActionDisabled={isPlayCardActionDisabled}
                ></MinionCardInGame>
            ))}
        </Flex>
    );
};
