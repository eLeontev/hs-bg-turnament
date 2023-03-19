import { getPlayerAndAvailableCards } from './play-game.server.service';

import { rearrangeCardsOrderOperation } from '../operations/play-game.player.operations';

import { rearrangeCardsOrderValidator } from '../validators/play-game.player-actions.validators';

import { CardId } from '../../../data/minions/battle-cries/minions.battle-cries';
import { RearrangeCardsOrderPlayerInput } from '../models/play-game.player-actions.models';

import { rearrangeCardsOrderStateAction } from '../utils/play-game.player-actions.utils';

export class PlayGameOrderService {
    async rearrangeCardsOrderMutation({
        cardsPlacement,
        fromCardId,
        toCardId,
        ...baseInput
    }: RearrangeCardsOrderPlayerInput): Promise<void> {
        const { player } = await getPlayerAndAvailableCards(baseInput);
        const cardIds = player[cardsPlacement];

        const fromCardIdIndex = cardIds.findIndex(
            (cardId: CardId) => cardId === fromCardId
        );
        const toCardIdIndex = cardIds.findIndex(
            (cardId: CardId) => cardId === toCardId
        );

        rearrangeCardsOrderValidator(fromCardIdIndex);
        rearrangeCardsOrderValidator(toCardIdIndex);

        const data = rearrangeCardsOrderStateAction(
            player,
            cardsPlacement,
            {
                cardId: fromCardId,
                index: fromCardIdIndex,
            },
            {
                cardId: toCardId,
                index: toCardIdIndex,
            }
        );

        await rearrangeCardsOrderOperation(baseInput.playerIdInGame, data);
    }
}

export const orderService = new PlayGameOrderService();
