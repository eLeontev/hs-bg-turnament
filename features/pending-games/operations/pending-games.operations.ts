import prisma from '../../../lib/prisma';

import {
    GameId,
    PlayerId,
    PlayerKey,
    PlayerLogin,
} from '../../../models/common.models';
import { OperationPendingGame } from '../pending-games.models';

export const createPendingGameOperation = ({
    players,
    ...pendingGame
}: OperationPendingGame) =>
    prisma.pendingGame.create({
        data: { ...pendingGame, players: { create: players } },
    });

export const deletePendingGameOperation = (gameId: GameId) =>
    prisma.pendingGame.delete({ where: { gameId } });

export const joinPendingGameOperation = (
    gameId: GameId,
    playerLogin: PlayerLogin,
    playerId: PlayerId,
    playerKey: PlayerKey,
    playerIdInGame: PlayerId
) =>
    prisma.pendingGamePlayer.create({
        data: {
            playerId,
            playerLogin,
            playerKey,
            playerIdInGame,
            PendingGame: { connect: { gameId } },
        },
    });

export const leavePendingGameOperation = (playerId: PlayerId) =>
    prisma.pendingGamePlayer.delete({
        where: { playerId },
    });

export const getPendingGamesOperation = () =>
    prisma.pendingGame.findMany({
        include: { players: true },
    });

export const getAuthorCreatedPendingGameOperation = (
    gameId: GameId,
    authorId: PlayerId,
    withPlayers: boolean = false
) =>
    prisma.pendingGame.findFirst({
        where: { gameId, authorId },
        include: { players: withPlayers },
    });

export const getPendingGameOperation = (gameId: GameId) =>
    prisma.pendingGame.findFirst({
        where: { gameId },
        include: { players: true },
    });

export const getPlayerInPendingGameOperation = (
    gameId: GameId,
    playerId: PlayerId
) =>
    prisma.pendingGame.findFirst({
        where: { gameId },
        include: { players: { where: { playerId } } },
    });

export const isPlayerInGameOperation = (playerId: PlayerId) =>
    prisma.pendingGamePlayer.findFirst({ where: { playerId } });
