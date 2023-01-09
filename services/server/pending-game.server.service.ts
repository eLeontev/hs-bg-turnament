import {
    createPendingGameOperation,
    deletePendingGameOperation,
    getAuthorCreatedPendingGameOperation,
    getPendingGameOperation,
    getPendingGamesOperation,
    isPlayerInGameOperation,
    joinPendingGameOperation,
    leavePendingGameOperation,
} from '../../prisma/operations/pending-games';

import { maxCountOfPlayers } from '../../constants/game-config.constants';

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
    const playerInPendingGame = await isPlayerInGameOperation(playerId);

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
    const playerIdInGame = await getHash();
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
                playerIdInGame,
            },
        ],
    };

    await createPendingGameOperation(pendingGame);

    console.log('create', gameId);

    return playerIdInGame;
};

export const deletePendingGame = async ({
    gameId,
    playerId,
}: DeletePendingGameBody) => {
    const pendingGame = await getAuthorCreatedPendingGameOperation(
        gameId,
        playerId
    );

    if (!pendingGame) {
        throw new Error('game to delete where you are an author is not found');
    }

    await deletePendingGameOperation(gameId);

    console.log('delete', gameId);
};

export const joinPendingGame = async ({
    playerId,
    gameId,
    playerLogin,
}: JoinPendingGameBody) => {
    await isPlayerInGameCheck(playerId);

    const pendingGame = await getPendingGameOperation(gameId);

    if (!pendingGame) {
        throw new Error('selected game does not exist');
    }

    const { players } = pendingGame;

    if (players.length >= maxCountOfPlayers) {
        throw new Error('no place');
    }

    const playerIdInGame = await getHash();
    await joinPendingGameOperation(
        gameId,
        playerLogin,
        playerId,
        playerIdInGame
    );

    console.log('join', `player: ${playerId} joined to the game: ${gameId}`);

    return playerIdInGame;
};

export const leavePendingGame = async ({
    gameId,
    playerId,
}: LeavePendingGameBody) => {
    await leavePendingGameOperation(playerId);
    console.log('leave', `player: ${playerId} left the game: ${gameId}`);
};

export const startPendingGame = async ({
    playerId,
    gameId,
}: StartPendingGameBody) => {
    const pendingGame = await getAuthorCreatedPendingGameOperation(
        gameId,
        playerId,
        true
    );

    if (!pendingGame) {
        throw new Error('game to delete where you are an author is not found');
    }

    await deletePendingGame({ playerId, gameId });
    console.log('start', gameId);

    return pendingGame;
};

export const getPendingGames = async () => {
    const pendingGames = await getPendingGamesOperation();
    console.log('get', pendingGames);

    return pendingGames.map((pendingGame) => ({
        ...pendingGame,
        players: pendingGame.players.map((player) => ({
            playerId: player.playerId,
            playerLogin: player.playerLogin,
        })),
    }));
};
