import prisma from '../../lib/prisma';

import { GameId, PlayerId } from '../../models/common.models';
import { Players } from '../../models/player-id.models';

export const startPlayGameOperation = (gameId: GameId, players: Players) =>
    prisma.playGame.create({
        data: {
            gameId,
            players: { create: players },
        },
    });

export const isPlayerInPlayGameOperation = (
    gameId: GameId,
    playerId: PlayerId
) =>
    prisma.playGame.findFirst({
        where: { gameId },
        include: { players: { where: { playerId } } },
    });
