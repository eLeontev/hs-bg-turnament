import { startPlayGameOperation } from '../../prisma/operations/play-game';

import { GameId } from '../../models/common.models';
import { InitPlayGameBody } from '../../models/play-game.models';
import { PendingGamePlayer } from '@prisma/client';

export const startPlayGame = async (
    gameId: GameId,
    pendingGamePlayers: Array<PendingGamePlayer>
) => {
    const playGamepPlayers = pendingGamePlayers.map(
        ({ playerId, playerLogin }) => ({ playerId, playerLogin })
    );
    await startPlayGameOperation(gameId, playGamepPlayers);
};

export const initPlayGame = async (body: InitPlayGameBody) => {
    console.log(body);
};
