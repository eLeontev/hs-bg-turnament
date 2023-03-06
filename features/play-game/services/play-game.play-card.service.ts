import { getPlayerAndAvailableCards } from './play-game.server.service';

import { playPlayerCardOperation } from '../operations/play-game.player.operations';

import { PlayMinionPlayerInput } from '../models/play-game.player-actions.models';
import { playCardPlayerStateAction } from '../utils/play-game.player-actions.utils';
import { playCardValidator } from '../validators/play-game.player-actions.validators';

export class PlayCardService {
    async playCard({
        cardId,
        targetId,
        ...baseInput
    }: PlayMinionPlayerInput): Promise<void> {
        const { player } = await getPlayerAndAvailableCards(baseInput);

        // TODO: add play minion logic to change return type to return battle cry effect

        playCardValidator(player, cardId);

        const { deskCardIds, handCardIds } = playCardPlayerStateAction(
            player,
            cardId
        );

        await playPlayerCardOperation(
            baseInput.playerIdInGame,
            handCardIds,
            deskCardIds
        );
    }
}

export const playCardService = new PlayCardService();
