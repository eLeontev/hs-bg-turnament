import { baseInputSelector, usePlayGameStore } from '../store/play-game.store';
import {
    deskCardIdsSelector,
    sellCardSelector,
    usePlayerStore,
} from '../store/play-game.player.store';
import { trpc } from '../../../../lib/client';
import { CardId } from '../../../../data/minions/battle-cries/minions.battle-cries';
import { isSellCardActionDisabled } from '../../validators/play-game.player-actions.validators';
import { Flex } from '@mantine/core';
import { MinionCardInGame } from './minion.component';

export const DeskMinions = () => {
    const baseInput = usePlayGameStore(baseInputSelector);

    const deskCardIds = usePlayerStore(deskCardIdsSelector);
    const sellCard = usePlayerStore(sellCardSelector);

    const { mutateAsync, isLoading } = trpc.sellMinion.useMutation();

    const action = (cardId: CardId) => {
        const validatorErrorMessage = isSellCardActionDisabled(
            usePlayerStore.getState(),
            cardId
        );

        if (validatorErrorMessage) {
            alert(validatorErrorMessage);

            return;
        }

        sellCard(cardId);
        mutateAsync({ ...baseInput, cardId }).catch(console.error);
    };

    return (
        <Flex h={330}>
            {deskCardIds.map((cardId) => (
                <MinionCardInGame
                    key={cardId}
                    cardId={cardId}
                    isLoading={isLoading}
                    action={() => action(cardId)}
                    label="Sell minion"
                    isActionDisabled={isSellCardActionDisabled}
                ></MinionCardInGame>
            ))}
        </Flex>
    );
};
