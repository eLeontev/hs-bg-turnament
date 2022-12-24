import pendingGamesStore from '../../constants/pending-games.constants';

import {
    CreatePendingGameBody,
    DeletePendingGameBody,
    PendingGame,
} from '../../models/pending-games.models';

import { getHash } from '../../utils.ts/hash-server.utils';

export const createPendingGame = async (body: CreatePendingGameBody) => {
    pendingGamesStore.pendingGamesAuthorIds.add(body.authorId);
    pendingGamesStore.pendingGames = [
        ...pendingGamesStore.pendingGames,
        {
            authorId: body.authorId,
            gameId: await getHash(),
            authorLogin: body.authorLogin,
            createdDate: new Date().toUTCString(),
            countOfPlayers: 1,
        },
    ];
    console.log('create', pendingGamesStore.pendingGames);
};

export const deletePendingGame = ({ authorId }: DeletePendingGameBody) => {
    pendingGamesStore.pendingGamesAuthorIds.delete(authorId);
    pendingGamesStore.pendingGames = pendingGamesStore.pendingGames.filter(
        (pendingGame: PendingGame) => pendingGame.authorId !== authorId
    );
};

export const getPendingGames = () => {
    console.log('get', pendingGamesStore.pendingGames);
    return pendingGamesStore.pendingGames;
};
