import { playGamePhases } from '@prisma/client';

import {
    getPlayGameOperation,
    startPlayGameOperation,
} from '../../prisma/operations/play-game';

import { GameId } from '../../models/common.models';
import { PlayGameBaseInput } from '../../models/play-game/play-game.models';

import { PendingGamePlayer } from '@prisma/client';
import { getHashesFromValues } from '../../utils.ts/hash-server.utils';
import { playGameZodPhases } from '../../schemas/play-game.schemas';

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

export const getPlayGame = async ({
    gameId,
    playerIdInGame,
}: PlayGameBaseInput) => {
    const { players, ...rest } = await getPlayGameOperation(
        gameId,
        playerIdInGame
    );

    const hashesFromPlayerIdsInGame = await getHashesFromValues(
        players.map(({ playerIdInGame }) => playerIdInGame)
    );

    return {
        ...rest,
        players: players.map(({ playerLogin, playerIdInGame }) => ({
            playerLogin,
            key: hashesFromPlayerIdsInGame.get(playerIdInGame) || '',
        })),
    };
};
