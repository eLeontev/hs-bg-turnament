import prisma from '../../lib/prisma';

import { GameId, PlayerId, PlayerLogin } from '../../models/common.models';
import { PendingGame } from '../../models/pending-games.models';

const createPendingGame = ({ players, ...pendingGame }: PendingGame) =>
    prisma.pendingGame.create({
        data: { ...pendingGame, players: { create: players } },
    });

const deletePendingGame = (gameId: GameId) =>
    prisma.pendingGame.delete({ where: { gameId } });

const joinPendingGame = (
    gameId: GameId,
    playerLogin: PlayerLogin,
    playerId: PlayerId
) =>
    prisma.pendingGamePlayer.create({
        data: { playerId, playerLogin, PendingGame: { connect: { gameId } } },
    });

const leavePendingGame = (playerId: PlayerId) =>
    prisma.pendingGamePlayer.delete({
        where: { playerId },
    });

const getPendingGames = () =>
    prisma.pendingGame.findMany({
        include: { players: true },
    });

const getAuthorCreatedPendingGame = (gameId: GameId, authorId: PlayerId) =>
    prisma.pendingGame.findFirst({
        where: { gameId, authorId },
    });

const getPendingGame = (gameId: GameId) =>
    prisma.pendingGame.findFirst({
        where: { gameId },
        include: { players: true },
    });

const getPlayerInPendingGame = (gameId: GameId, playerId: PlayerId) =>
    prisma.pendingGame.findFirst({
        where: { gameId },
        include: { players: { where: { playerId } } },
    });

const isPlayerInGame = (playerId: PlayerId) =>
    prisma.pendingGamePlayer.findFirst({ where: { playerId } });

export const operations = {
    createPendingGame,
    deletePendingGame,
    joinPendingGame,
    leavePendingGame,
    getAuthorCreatedPendingGame,
    getPendingGames,
    getPendingGame,
    isPlayerInGame,
    getPlayerInPendingGame,
};
