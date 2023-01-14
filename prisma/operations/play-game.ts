import prisma from '../../lib/prisma';

import { GameId, PlayerIdInGame } from '../../models/common.models';
import { PlayGameData } from '../../models/play-game/play-game.models';
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

export const getPlayGameOperation = (
    gameId: GameId,
    playerIdInGame: PlayerIdInGame
) =>
    prisma.playGame.findFirstOrThrow({
        where: { gameId },
        include: { players: { where: { playerIdInGame } } },
    });

export const isPlayerInPlayGameOperation = (
    gameId: GameId,
    playerIdInGame: PlayerIdInGame
) =>
    prisma.playGame.findFirst({
        where: { gameId },
        include: { players: { where: { playerIdInGame } } },
    });
