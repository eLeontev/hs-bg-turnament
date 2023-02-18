import { getPlayGameOperation } from '../operations/play-game.operations';

import { getAlivePlayers } from './play-game.alive-players.service';
import { tavernCardsService } from './play-game.tavern-cards.service';

import { GameId } from '../../../models/common.models';
import { PlayGamePlayer } from '../../player/player.models';

export class PlayGamePhaseInitializationService {
    async initRecruitPhase(gameId: GameId): Promise<void> {
        const { players } = await getPlayGameOperation(gameId);

        const alivePlayers = getAlivePlayers(players);

        alivePlayers.map(({ playerIdInGame }: PlayGamePlayer) =>
            tavernCardsService.assignCardsOnPhaseInit({
                gameId,
                playerIdInGame,
            })
        );
    }
}

export const phaseInitializationService =
    new PlayGamePhaseInitializationService();
