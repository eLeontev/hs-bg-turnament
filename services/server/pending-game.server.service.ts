import { operations } from '../../prisma/operations/pending-games';

import { maxCountOfPlayers } from '../../constants/game-config.constants';
import pendingGamesStore from '../../constants/pending-games.constants';

import {
    CreatePendingGameBody,
    DeletePendingGameBody,
    JoinPendingGameBody,
    LeavePendingGameBody,
    StartPendingGameBody,
} from '../../models/pending-games.models';
import { PlayerId } from '../../models/common.models';

import { getHash } from '../../utils.ts/hash-server.utils';

export const isPlayerInGameCheck = async (playerId: PlayerId) => {
    const playerInPendingGame = await operations.isPlayerInGame(playerId);

    if (playerInPendingGame) {
        throw new Error('you are already in game');
    }
};

export const createPendingGame = async ({
    playerId,
    playerLogin,
    gameName,
}: CreatePendingGameBody) => {
    await isPlayerInGameCheck(playerId);

    const gameId = await getHash();

    const pendingGame = {
        gameName,
        gameId,
        authorId: playerId,
        authorLogin: playerLogin,
        createdDate: new Date().toUTCString(),
        players: [
            {
                playerId,
                playerLogin,
            },
        ],
    };

    await operations.createPendingGame(pendingGame);

    console.log('create', pendingGamesStore.pendingGames);
};

export const deletePendingGame = async ({
    gameId,
    playerId,
}: DeletePendingGameBody) => {
    const pendingGame = await operations.getAuthorCreatedPendingGame(
        gameId,
        playerId
    );

    if (!pendingGame) {
        throw new Error('game to delete where you are an author is not found');
    }

    await operations.deletePendingGame(gameId);

    console.log('delete', pendingGame.gameId);
};

export const joinPendingGame = async ({
    playerId,
    gameId,
    playerLogin,
}: JoinPendingGameBody) => {
    await isPlayerInGameCheck(playerId);

    const pendingGame = await operations.getPendingGame(gameId);

    if (!pendingGame) {
        throw new Error('selected game does not exist');
    }

    const { players } = pendingGame;

    if (players.length >= maxCountOfPlayers) {
        throw new Error('no place');
    }

    await operations.joinPendingGame(gameId, playerLogin, playerId);

    console.log('join', `player: ${playerId} joined to the game: ${gameId}`);
};

export const leavePendingGame = async ({
    gameId,
    playerId,
}: LeavePendingGameBody) => {
    await operations.leavePendingGame(playerId);
    console.log('leave', `player: ${playerId} left the game: ${gameId}`);
};

export const startPendingGame = async ({
    playerId,
    gameId,
}: StartPendingGameBody) => {
    const pendingGame = await operations.getAuthorCreatedPendingGame(
        gameId,
        playerId
    );

    if (!pendingGame) {
        throw new Error('game to delete where you are an author is not found');
    }

    await deletePendingGame({ playerId, gameId });
    console.log('start', gameId);
};

export const getPendingGames = async () => {
    const pendingGames = await operations.getPendingGames();
    console.log('get', pendingGames);

    return pendingGames;
};
