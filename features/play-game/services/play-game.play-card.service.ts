import { getPlayerAndAwailableCards } from './play-game.server.service';

import { addCardToPlayerDeskCardsOperation } from '../operations/play-game.player.operations';

import { PlayMinionPlayerInput } from '../models/play-game.player-actions.models';

export class PlayCardService {
    async playMinion({
        targetId,
        cardId,
        ...baseInput
    }: PlayMinionPlayerInput): Promise<any> {
        const { player } = await getPlayerAndAwailableCards(baseInput, false);
        const { handCardIds, deskCardIds } = player;

        const filteredHandCardIds = handCardIds.filter(
            (handCardId) => handCardId !== cardId
        );

        if (filteredHandCardIds.length === handCardIds.length) {
            throw new Error('the card does not exisit in your hand');
        }

        await addCardToPlayerDeskCardsOperation(
            baseInput.playerIdInGame,
            filteredHandCardIds,
            [...deskCardIds, cardId]
        );
    }
}

export const playCardService = new PlayCardService();
