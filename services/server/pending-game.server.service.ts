import { maxCountOfPlayers } from '../../constants/game-config.constants';
import pendingGamesStore from '../../constants/pending-games.constants';

import {
    CreatePendingGameBody,
    DeletePendingGameBody,
    JoinPendingGameBody,
    LeavePendingGameBody,
    PendingGame,
} from '../../models/pending-games.models';

import { getHash } from '../../utils.ts/hash-server.utils';

export const createPendingGame = async ({
    authorId,
    authorLogin,
    gameName,
}: CreatePendingGameBody) => {
    if (pendingGamesStore.pendingGamesAuthorIds.has(authorId)) {
        throw new Error('only one game can be created at time');
    }

    const gameId = await getHash();
    pendingGamesStore.pendingGamesAuthorIds.add(authorId);
    pendingGamesStore.pendingGames = [
        ...pendingGamesStore.pendingGames,
        {
            authorId,
            gameName,
            gameId,
            authorLogin,
            createdDate: new Date().toUTCString(),
            players: [
                {
                    playerId: authorId,
                    playerLogin: authorLogin,
                },
            ],
        },
    ];

    console.log('create', pendingGamesStore.pendingGames);
    return { gameId, playerId: authorId };
};

export const deletePendingGame = ({ authorId }: DeletePendingGameBody) => {
    if (!pendingGamesStore.pendingGamesAuthorIds.has(authorId)) {
        throw new Error('you are not an author of any game');
    }

    pendingGamesStore.pendingGamesAuthorIds.delete(authorId);
    pendingGamesStore.pendingGames = pendingGamesStore.pendingGames.filter(
        (pendingGame: PendingGame) => pendingGame.authorId !== authorId
    );
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

export const getPendingGames = () => {
    console.log('get', pendingGamesStore.pendingGames);
    return pendingGamesStore.pendingGames;
};
