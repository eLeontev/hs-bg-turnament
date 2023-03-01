import { baseInputSelector, usePlayGameStore } from '../store/play-game.store';
import {
    frozenCardIdsSelector,
    purchaseCardSelector,
    tavernCardIdsSelector,
    usePlayerStore,
} from '../store/play-game.player.store';
import { trpc } from '../../../../lib/client';
import { CardId } from '../../../../data/minions/battle-cries/minions.battle-cries';
import { isPurchaseCardActionDisabled } from '../../validators/play-game.player-actions.validators';
import { Flex } from '@mantine/core';
import { MinionCardInGame } from './minion.component';

export const TavernMinions = () => {
    const baseInput = usePlayGameStore(baseInputSelector);

    const tavernCardIds = usePlayerStore(tavernCardIdsSelector);
    const frozenCardIds = usePlayerStore(frozenCardIdsSelector);
    const purchaseCard = usePlayerStore(purchaseCardSelector);

    const { mutateAsync, isLoading } = trpc.purchaseMinion.useMutation();

    const action = (cardId: CardId) => {
        const validatorErrorMessage = isPurchaseCardActionDisabled(
            usePlayerStore.getState(),
            cardId
        );

        if (validatorErrorMessage) {
            alert(validatorErrorMessage);

            return;
        }

        purchaseCard(cardId);
        mutateAsync({ ...baseInput, cardId }).catch(console.error);
    };

    return (
        <Flex h={330}>
            {tavernCardIds.map((cardId) => (
                <MinionCardInGame
                    key={cardId}
                    cardId={cardId}
                    isLoading={isLoading}
                    action={() => action(cardId)}
                    label="Buy minion"
                    isActionDisabled={isPurchaseCardActionDisabled}
                    isFrozen={frozenCardIds.includes(cardId)}
                ></MinionCardInGame>
            ))}
        </Flex>
    );
};
