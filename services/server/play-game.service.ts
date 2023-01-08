import {
    getPlayGameOperation,
    startPlayGameOperation,
} from '../../prisma/operations/play-game';

import { playGamePhases } from '../../enums/play-game.enums';

import { GameId } from '../../models/common.models';
import { PlayGameBody } from '../../models/play-game.models';

import { PendingGamePlayer } from '@prisma/client';

export const startPlayGame = async (
    gameId: GameId,
    pendingGamePlayers: Array<PendingGamePlayer>
) => {
    const playGamePlayers = pendingGamePlayers.map(
        ({ playerId, playerLogin }) => ({ playerId, playerLogin })
    );

    await startPlayGameOperation(gameId, playGamePlayers, {
        phase: playGamePhases.heroSelection,
    });
};

export const getPlayGame = async ({ gameId, playerId }: PlayGameBody) =>
    getPlayGameOperation(gameId, playerId);
