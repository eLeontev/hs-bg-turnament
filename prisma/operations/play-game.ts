import prisma from '../../lib/prisma';

import { GameId, PlayerId } from '../../models/common.models';
import { PlayGameData } from '../../models/play-game.models';
import { PlayGamePlayers } from '../../models/player.models';

export const startPlayGameOperation = (
    gameId: GameId,
    players: PlayGamePlayers,
    playGameData: PlayGameData
) =>
    prisma.playGame.create({
        data: {
            gameId,
            ...playGameData,
            players: { create: players },
        },
    });

export const getPlayGameOperation = (gameId: GameId, playerId: PlayerId) =>
    prisma.playGame.findFirstOrThrow({
        where: { gameId },
        include: { players: { where: { playerId } } },
    });

export const isPlayerInPlayGameOperation = (
    gameId: GameId,
    playerId: PlayerId
) =>
    prisma.playGame.findFirst({
        where: { gameId },
        include: { players: { where: { playerId } } },
    });
