import { getPlayGameOperation } from '../operations/play-game.operations';

import { minimumCountOfAlivePlayersToContinuePlayGame } from './play-game.engine.constants';

import { GameId } from '../../../models/common.models';
import { PlayGamePlayer } from '../../player/player.models';

export const isPlayGameOver = async (gameId: GameId) => {
    const { players } = await getPlayGameOperation(gameId);
    const countOfAlivePlayers = players.filter(
        ({ countOfHitPoints }: PlayGamePlayer) => countOfHitPoints
    ).length;

    const isGameOver =
        countOfAlivePlayers < minimumCountOfAlivePlayersToContinuePlayGame;
    const [winner] = players;
    return { isGameOver, winner };
};
