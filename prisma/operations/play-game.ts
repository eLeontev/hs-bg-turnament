import prisma from '../../lib/prisma';

import { GameId, PlayerId } from '../../models/common.models';
import { PlayGameData } from '../../models/play-game.models';
import { Players } from '../../models/player-id.models';

export const startPlayGameOperation = (
    gameId: GameId,
    players: Players,
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
