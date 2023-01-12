import { playGamePhases } from '@prisma/client';

import {
    getPlayGameOperation,
    startPlayGameOperation,
} from '../../prisma/operations/play-game';

import { GameId } from '../../models/common.models';
import { PlayGameBody } from '../../models/play-game.models';

import { PendingGamePlayer } from '@prisma/client';

export const startPlayGame = async (
    gameId: GameId,
    pendingGamePlayers: Array<PendingGamePlayer>
) => {
    const playGamePlayers = pendingGamePlayers.map(
        ({ playerLogin, playerIdInGame }) => ({
            playerIdInGame,
            playerLogin,
        })
    );

    await startPlayGameOperation(gameId, playGamePlayers, {
        phase: playGamePhases.heroSelection,
    });
};

export const getPlayGame = ({ gameId, playerIdInGame }: PlayGameBody) =>
    getPlayGameOperation(gameId, playerIdInGame);
