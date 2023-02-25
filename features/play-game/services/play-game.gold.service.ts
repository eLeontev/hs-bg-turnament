import { z } from 'zod';
import { GameId } from '../../../models/common.models';
import {
    getPlayGamePlayersOperation,
    setGoldAmountToPlayersOperation,
} from '../operations/play-game.operations';
import { playGameRoundSchema } from '../schemas/play-game.schemas';
import { getAmountOfGoldOnRoundStart } from '../utils/gold-amount.utils';
import { getAlivePlayers } from './play-game.alive-players.service';

export class PlayGameGoldService {
    async setGoldOnPhaseInit(
        gameId: GameId,
        round: z.infer<typeof playGameRoundSchema>
    ): Promise<void> {
        const players = await getPlayGamePlayersOperation(gameId);

        const alivePlayerIdsInGame = getAlivePlayers(players).map(
            ({ playerIdInGame }) => playerIdInGame
        );
        const goldAmount = getAmountOfGoldOnRoundStart(round);

        await setGoldAmountToPlayersOperation(alivePlayerIdsInGame, goldAmount);
    }
}

export const goldService = new PlayGameGoldService();
