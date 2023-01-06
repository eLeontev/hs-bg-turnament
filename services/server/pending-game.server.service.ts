import { isPlayerInGame } from '../pending-games.service';

import { maxCountOfPlayers } from '../../constants/game-config.constants';
import pendingGamesStore from '../../constants/pending-games.constants';

import {
    CreatePendingGameBody,
    DeletePendingGameBody,
    JoinPendingGameBody,
    LeavePendingGameBody,
    PendingGame,
    PendingGames,
    StartPendingGameBody,
} from '../../models/pending-games.models';

import { getHash } from '../../utils.ts/hash-server.utils';

export const isPlayerInGameCheck = (
    pendingGames: PendingGames,
    playerId: string
) => {
    const isInGame = isPlayerInGame(pendingGames, playerId);
    if (isInGame) {
        throw new Error('only one game is avaialble at time');
    }
};

export const createPendingGame = async ({
    playerId,
    playerLogin,
    gameName,
}: CreatePendingGameBody) => {
    if (pendingGamesStore.pendingGamesAuthorIds.has(playerId)) {
        throw new Error('only one game can be created at time');
    }

    isPlayerInGameCheck(pendingGamesStore.pendingGames, playerId);

    const gameId = await getHash();
    pendingGamesStore.pendingGamesAuthorIds.add(playerId);
    pendingGamesStore.pendingGames = [
        ...pendingGamesStore.pendingGames,
        {
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
        },
    ];

    console.log('create', pendingGamesStore.pendingGames);
};

export const deletePendingGame = ({
    playerId,
    gameId,
}: DeletePendingGameBody) => {
    if (!pendingGamesStore.pendingGamesAuthorIds.has(playerId)) {
        throw new Error('you are not an author of any game');
    }

    pendingGamesStore.pendingGamesAuthorIds.delete(playerId);
    const pendingGame = pendingGamesStore.pendingGames.find(
        (pendingGame: PendingGame) => pendingGame.gameId === gameId
    );

    if (!pendingGame) {
        throw new Error('game to delete not found');
    }

    pendingGamesStore.pendingGames = pendingGamesStore.pendingGames.filter(
        (pendingGame: PendingGame) => pendingGame.gameId !== gameId
    );

    console.log('delete', pendingGame.gameId);
};

const updatePendingGame = (joinedPendingGame: PendingGame) => {
    pendingGamesStore.pendingGames = pendingGamesStore.pendingGames.map(
        (pendingGame) => {
            if (pendingGame.gameId === joinedPendingGame.gameId) {
                return joinedPendingGame;
            }

            return pendingGame;
        }
    );
};

export const joinPendingGame = ({
    playerId,
    gameId,
    playerLogin,
}: JoinPendingGameBody) => {
    if (pendingGamesStore.pendingGamesAuthorIds.has(playerId)) {
        throw new Error('please close your own game before to start a new one');
    }

    isPlayerInGameCheck(pendingGamesStore.pendingGames, playerId);

    const joinedPendingGame = pendingGamesStore.pendingGames.find(
        (pendingGame) => pendingGame.gameId === gameId
    );

    if (!joinedPendingGame) {
        throw new Error('selected game does not exist');
    }

    const { players } = joinedPendingGame;

    if (players.length >= maxCountOfPlayers) {
        throw new Error('no place');
    }

    const isPlayerInGame = players.some(
        (player) => player.playerId === playerId
    );

    if (isPlayerInGame) {
        throw new Error('you are already in the game');
    }

    joinedPendingGame.players = [
        ...joinedPendingGame.players,
        {
            playerId,
            playerLogin,
        },
    ];

    console.log('join', joinedPendingGame);
    updatePendingGame(joinedPendingGame);
};

export const leavePendingGame = ({
    gameId,
    playerId,
}: LeavePendingGameBody) => {
    const joinedPendingGame = pendingGamesStore.pendingGames.find(
        (pendingGame) => pendingGame.gameId === gameId
    );

    if (!joinedPendingGame) {
        return;
    }

    joinedPendingGame.players = joinedPendingGame.players.filter(
        (player) => player.playerId !== playerId
    );

    console.log('leave', joinedPendingGame);
    updatePendingGame(joinedPendingGame);
};

export const startPendingGame = ({
    playerId,
    gameId,
}: StartPendingGameBody) => {
    const pendingGameToStart = pendingGamesStore.pendingGames.find(
        ({ authorId }) => authorId === playerId
    );

    if (!pendingGameToStart) {
        throw new Error(
            'the game where you are an author is not found (only author of the game can start it)'
        );
    }

    if (pendingGameToStart.gameId !== gameId) {
        throw new Error(
            'the selected game does not match to the game where you are an author'
        );
    }

    console.log('start', gameId);
    deletePendingGame({ playerId, gameId });

    return pendingGameToStart;
};

export const getPendingGames = () => {
    console.log('get', pendingGamesStore.pendingGames);
    return pendingGamesStore.pendingGames;
};
